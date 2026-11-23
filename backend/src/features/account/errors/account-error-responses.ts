import { HttpStatus } from '@nestjs/common';
import type { PhoneAlreadyRegisteredError } from './phone-already-registered.error';

export const accountErrorResponses = {
  PHONE_ALREADY_REGISTERED: {
    status: HttpStatus.CONFLICT,
    message: 'An account with this phone already exists',
  },
} satisfies Record<
  PhoneAlreadyRegisteredError['code'],
  { status: HttpStatus; message: string }
>;
