import type { AccountView } from '../dto/account-response.dto';
import type { AccountViewRow } from '../persistence/account-queries';

export function toAccountView(user: AccountViewRow): AccountView {
  const destination = user.plans.length
    ? '/home'
    : user.profile
      ? '/onboarding/plan'
      : '/onboarding';
  return { name: user.name, destination };
}
