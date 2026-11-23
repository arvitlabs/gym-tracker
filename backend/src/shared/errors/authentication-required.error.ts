import { ApplicationError } from './application-error';

export class AuthenticationRequiredError extends ApplicationError {
  readonly code = 'AUTHENTICATION_REQUIRED';

  constructor(cause?: unknown) {
    super('Authentication required', cause);
    this.name = 'AuthenticationRequiredError';
  }
}
