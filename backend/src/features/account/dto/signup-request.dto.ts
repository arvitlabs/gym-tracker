import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { LoginRequestDto } from './login-request.dto';

export class SignupRequestDto extends LoginRequestDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @Matches(/^000000$/)
  code: string;
}
