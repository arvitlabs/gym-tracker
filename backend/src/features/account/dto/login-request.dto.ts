import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @Matches(/^\+[1-9]\d{7,14}$/)
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
