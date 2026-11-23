import { HttpStatus } from '@nestjs/common';
import type { AuthenticationRequiredError } from '../errors/authentication-required.error';

export const sharedErrorResponses = {
  AUTHENTICATION_REQUIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
} satisfies Record<
  AuthenticationRequiredError['code'],
  { status: HttpStatus; message: string }
>;
