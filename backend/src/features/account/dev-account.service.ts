import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  OnModuleDestroy,
  UnauthorizedException,
} from '@nestjs/common';
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  randomUUID,
} from 'node:crypto';
import { promisify } from 'node:util';
import { Pool } from 'pg';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import {
  LoginResponseDto,
  SignupResponseDto,
} from './dto/account-response.dto';

const scrypt = promisify(scryptCallback);
@Injectable()
export class DevAccountService implements OnModuleDestroy {
  private readonly pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  private ensureDevelopment() {
    if (process.env.NODE_ENV !== 'development') throw new ForbiddenException();
  }
  async signup(input: SignupRequestDto): Promise<SignupResponseDto> {
    this.ensureDevelopment();
    const name = input.name.trim();
    if (!name) throw new BadRequestException('Name is required');
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(input.password, salt, 64)) as Buffer;
    try {
      await this.pool.query(
        'INSERT INTO "User" (id, phone, name, "securityStamp", "passwordHash", "phoneVerifiedAt") VALUES ($1,$2,$3,$4,$5,NOW())',
        [
          randomUUID(),
          input.phone,
          name,
          randomUUID(),
          `scrypt:${salt}:${hash.toString('hex')}`,
        ],
      );
    } catch (error) {
      if ((error as { code?: string }).code === '23505')
        throw new ConflictException(
          'An account with this phone already exists',
        );
      throw error;
    }
    return { message: 'Account created. Please log in.' };
  }
  async login(input: LoginRequestDto): Promise<LoginResponseDto> {
    this.ensureDevelopment();
    const result = await this.pool.query(
      'SELECT name, "passwordHash", "isActive" FROM "User" WHERE phone = $1',
      [input.phone],
    );
    const user = result.rows[0];
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
    return { name: user.name };
  }
  async onModuleDestroy() {
    await this.pool.end();
  }
}
