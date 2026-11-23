import { ApplicationError } from '../../../shared/errors/application-error';

export class PhoneAlreadyRegisteredError extends ApplicationError {
  readonly code = 'PHONE_ALREADY_REGISTERED';

  constructor(cause: unknown) {
    super('Phone already registered', cause);
    this.name = 'PhoneAlreadyRegisteredError';
  }
}
