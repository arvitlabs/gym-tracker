import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RecoveryPhoneDto {
  @IsString()
  @Matches(/^\+[1-9]\d{7,14}$/)
  phone: string;
}

export class VerifyRecoveryDto extends RecoveryPhoneDto {
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;
}

export class ResetPasswordDto extends VerifyRecoveryDto {
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
