import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  randomUUID,
} from 'node:crypto';
import { promisify } from 'node:util';
import {
  AccountRepository,
  PhoneAlreadyRegistered,
} from './persistence/account.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import { digest, fresh, issue, verifyAccess } from './account-session';
const scrypt = promisify(scryptCallback);
@Injectable()
export class DevAccountService {
  constructor(private readonly accounts: AccountRepository) {}
  private ensureDevelopment() {
    if (process.env.NODE_ENV !== 'development') throw new ForbiddenException();
  }
  async signup(input: SignupRequestDto) {
    this.ensureDevelopment();
    const name = input.name.trim();
    if (!name) throw new BadRequestException('Name is required');
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(input.password, salt, 64)) as Buffer;
    const refresh = fresh();
    try {
      return issue(
        await this.accounts.register(
          input.phone,
          name,
          `scrypt:${salt}:${hash.toString('hex')}`,
          digest(refresh),
        ),
        refresh,
      );
    } catch (error) {
      if (error instanceof PhoneAlreadyRegistered)
        throw new ConflictException(
          'An account with this phone already exists',
        );
      throw error;
    }
  }
  async login(input: LoginRequestDto) {
    this.ensureDevelopment();
    const user = await this.accounts.credentials(input.phone);
    const parts = (user?.passwordHash ?? '').split(':');
    if (
      !user?.isActive ||
      parts.length !== 3 ||
      parts[0] !== 'scrypt' ||
      !/^[a-f0-9]{128}$/.test(parts[2])
    )
      throw new UnauthorizedException('Invalid phone or password');
    const hash = (await scrypt(input.password, parts[1], 64)) as Buffer;
    if (!timingSafeEqual(hash, Buffer.from(parts[2], 'hex')))
      throw new UnauthorizedException('Invalid phone or password');
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
  async refresh(token: string) {
    this.ensureDevelopment();
    const next = fresh();
    return issue(await this.accounts.rotate(digest(token), digest(next)), next);
  }
  async me(token: string) {
    this.ensureDevelopment();
    const { grant, userId, stamp } = verifyAccess(token);
    const account = await this.accounts.current(grant, userId, stamp);
    if (!account) throw new UnauthorizedException();
    return account;
  }
  async logout(token: string) {
    this.ensureDevelopment();
    await this.accounts.revoke(digest(token));
  }
}
