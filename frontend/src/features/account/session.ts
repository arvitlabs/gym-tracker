import { apiBaseUrl } from '../../config';
export type Account = {
  name: string;
  destination: '/onboarding' | '/onboarding/plan' | '/home';
};
async function readAccount(response: Response) {
  const envelope = await response.json();
  const data = envelope?.data;
  if (
    envelope?.success !== true ||
    !data ||
    typeof data.name !== 'string' ||
    !['/onboarding', '/onboarding/plan', '/home'].includes(data.destination)
  )
    throw new Error('Unexpected account response.');
  const account: Account = { name: data.name, destination: data.destination };
  return { account, token: data.accessToken as unknown };
}
let access = '';
let pending: Promise<Account | null> | undefined;
export const authOptions: RequestInit = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json', 'X-Gym-Request': '1' },
};
export async function accept(response: Response): Promise<Account> {
  const { account, token } = await readAccount(response);
  if (typeof token !== 'string' || !token)
    throw new Error('Missing session credentials.');
  access = token;
  return account;
}
async function restore(): Promise<Account | null> {
  if (access) {
    const response = await fetch(apiBaseUrl + '/accounts/me', {
      headers: { Authorization: 'Bearer ' + access },
    });
    if (response.ok) return (await readAccount(response)).account;
    if (response.status !== 401) throw new Error('Session unavailable');
  }
  const response = await fetch(apiBaseUrl + '/accounts/refresh', authOptions);
  if (response.status === 401) {
    access = '';
    return null;
  }
  if (!response.ok) throw new Error('Session unavailable');
  return accept(response);
}
export function current() {
  return (pending ??= restore().finally(() => {
    pending = undefined;
  }));
}
export async function signOut() {
  await pending?.catch(() => {});
  access = '';
  const response = await fetch(apiBaseUrl + '/accounts/logout', authOptions);
  if (!response.ok) throw new Error('Sign out failed. Please retry.');
}
export type SignupDraft = { name: string; phone: string; password: string };
export let draft: SignupDraft | null = null;
export function setDraft(value: SignupDraft | null) {
  draft = value;
}
