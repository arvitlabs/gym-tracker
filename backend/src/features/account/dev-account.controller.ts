import { BrowserRequestGuard } from './guards/browser-request.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AccountResponseInterceptor, AccountErrorFilter } from './account-http';
import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Res,
  Header,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import type { Response } from 'express';
import { DevAccountService } from './dev-account.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import type { Issued } from './account-session';

const cookie = 'gt_refresh';
const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
  path: '/api/dev/accounts',
};
const readCookie = (header = '') =>
  header
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(cookie + '='))
    ?.slice(cookie.length + 1) ?? '';
function deliver(session: Issued, res: Response) {
  res.cookie(cookie, session.refresh, { ...options, maxAge: 30 * 86400000 });
  return session.body;
}
@Controller('dev/accounts')
@UseGuards(BrowserRequestGuard)
@UseFilters(AccountErrorFilter)
@UseInterceptors(AccountResponseInterceptor)
export class DevAccountController {
  constructor(private readonly accounts: DevAccountService) {}
  @Post('signup')
  @UseGuards(ThrottlerGuard)
  @Header('Cache-Control', 'no-store')
  async signup(
    @Body() input: SignupRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return deliver(await this.accounts.signup(input), res);
  }
  @Post('login')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  async login(
    @Body() input: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return deliver(await this.accounts.login(input), res);
  }
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  async refresh(
    @Headers('cookie') header: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return deliver(await this.accounts.refresh(readCookie(header)), res);
  }
  @Get('me')
  @Header('Cache-Control', 'no-store')
  me(@Headers('authorization') header = '') {
    return this.accounts.me(
      header.startsWith('Bearer ') ? header.slice(7) : '',
    );
  }
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Headers('cookie') header: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.accounts.logout(readCookie(header));
    res.clearCookie(cookie, options);
  }
}
