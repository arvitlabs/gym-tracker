import { Body, Controller, Post } from '@nestjs/common';
import { DevAccountService } from './dev-account.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import {
  LoginResponseDto,
  SignupResponseDto,
} from './dto/account-response.dto';

@Controller('dev/accounts')
export class DevAccountController {
  constructor(private readonly accounts: DevAccountService) {}

  @Post('signup')
  signup(@Body() input: SignupRequestDto): Promise<SignupResponseDto> {
    return this.accounts.signup(input);
  }

  @Post('login')
  login(@Body() input: LoginRequestDto): Promise<LoginResponseDto> {
    return this.accounts.login(input);
  }
}
