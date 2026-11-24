import { AuthenticationRequiredError } from '../../shared/errors/authentication-required.error';
import {
  BadRequestException,
  ServiceUnavailableException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  randomUUID,
} from 'node:crypto';
import { promisify } from 'node:util';
import { AccountRepository } from './persistence/account.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import { digest, fresh, issue, verifyAccess } from './helpers/account-session';
const scrypt = promisify(scryptCallback);
@Injectable()
export class AccountService {
  constructor(private readonly accounts: AccountRepository) {}
  private verifySignupCode(code: string) {
    if (process.env.NODE_ENV !== 'development')
      throw new ServiceUnavailableException(
        'Phone verification is unavailable.',
      );
    if (code !== '000000')
      throw new BadRequestException('Invalid verification code');
  }
  async signup(input: SignupRequestDto) {
    this.verifySignupCode(input.code);
    const name = input.name.trim();
    if (!name) throw new BadRequestException('Name is required');
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(input.password, salt, 64)) as Buffer;
    const refresh = fresh();
    return issue(
      await this.accounts.register(
        input.phone,
        name,
        `scrypt:${salt}:${hash.toString('hex')}`,
        digest(refresh),
      ),
      refresh,
    );
  }
  async login(input: LoginRequestDto) {
    const user = await this.accounts.credentials(input.phone);
    if (!user || !user.isActive)
      throw new NotFoundException('Account not found');
    const parts = (user?.passwordHash ?? '').split(':');
    if (
      !user?.isActive ||
      parts.length !== 3 ||
      parts[0] !== 'scrypt' ||
      !/^[a-f0-9]{128}$/.test(parts[2])
    )
      throw new UnauthorizedException('Incorrect password');
    const hash = (await scrypt(input.password, parts[1], 64)) as Buffer;
    if (!timingSafeEqual(hash, Buffer.from(parts[2], 'hex')))
      throw new UnauthorizedException('Incorrect password');
    const refresh = fresh();
    return issue(
      await this.accounts.start(
        randomUUID(),
        user.id,
        user.securityStamp,
        digest(refresh),
      ),
      refresh,
    );
  }
  async requestRecovery(phone: string) {
    if (process.env.NODE_ENV !== 'development')
      throw new ServiceUnavailableException(
        'Phone verification is unavailable.',
      );
    const user = await this.accounts.credentials(phone);
    if (!user?.isActive) throw new NotFoundException('Account not found');
    return { message: 'Development verification code ready.' };
  }

  async verifyRecovery(phone: string, code: string) {
    await this.requestRecovery(phone);
    this.verifySignupCode(code);
    return { message: 'Code verified.' };
  }

  async resetPassword(phone: string, code: string, password: string) {
    await this.verifyRecovery(phone, code);
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    const updated = await this.accounts.resetPassword(
      phone,
      `scrypt:${salt}:${hash.toString('hex')}`,
    );
    if (!updated) throw new NotFoundException('Account not found');
    return { message: 'Password changed successfully.' };
  }

  async refresh(token: string) {
    const next = fresh();
    return issue(await this.accounts.rotate(digest(token), digest(next)), next);
  }
  async me(token: string) {
    const { grant, userId, stamp } = verifyAccess(token);
    const account = await this.accounts.current(grant, userId, stamp);
    if (!account) throw new AuthenticationRequiredError();
    return account;
  }
  async logout(token: string) {
    await this.accounts.revoke(digest(token));
  }
}
