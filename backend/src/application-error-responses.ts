import { accountErrorResponses } from './features/account/errors/account-error-responses';
import { sharedErrorResponses } from './shared/http/shared-error-responses';

export const applicationErrors = new Map(
  Object.entries({
    ...sharedErrorResponses,
    ...accountErrorResponses,
  }),
);
