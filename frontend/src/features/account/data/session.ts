import { apiBaseUrl } from '@/config';
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
let signOutPending: Promise<void> | undefined;
const signedOutKey = 'gym-tracker-signed-out';

const authOptions: RequestInit = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json', 'X-Gym-Request': '1' },
};
async function accept(response: Response): Promise<Account> {
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
      signal: AbortSignal.timeout(5000),
    });
    if (localStorage.getItem(signedOutKey)) return null;
    if (response.ok) return (await readAccount(response)).account;
    if (response.status !== 401) throw new Error('Session unavailable');
  }
  const response = await fetch(apiBaseUrl + '/accounts/refresh', {
    ...authOptions,
    signal: AbortSignal.timeout(5000),
  });
  if (localStorage.getItem(signedOutKey)) return null;
  if (response.status === 401) {
    access = '';
    return null;
  }
  if (!response.ok) throw new Error('Session unavailable');
  return accept(response);
}
export function current() {
  if (localStorage.getItem(signedOutKey)) return Promise.resolve(null);
  return (pending ??= restore().finally(() => {
    pending = undefined;
  }));
}
export function signOut() {
  localStorage.setItem(signedOutKey, '1');
  access = '';
  signOutPending = (async () => {
    await pending?.catch(() => {});
    const response = await fetch(apiBaseUrl + '/accounts/logout', {
      ...authOptions,
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok)
      throw new Error('Server sign-out could not be confirmed.');
  })().finally(() => {
    signOutPending = undefined;
  });
  return signOutPending;
}

export async function login(phone: string, password: string) {
  await signOutPending?.catch(() => {});
  const response = await fetch(`${apiBaseUrl}/accounts/login`, {
    ...authOptions,
    body: JSON.stringify({ phone, password }),
  });
  if (!response.ok) await throwApiError(response);
  const account = await accept(response);
  localStorage.removeItem(signedOutKey);
  return account;
}

export async function signup(input: {
  name: string;
  phone: string;
  password: string;
  code: string;
}) {
  await signOutPending?.catch(() => {});
  const response = await fetch(`${apiBaseUrl}/accounts/signup`, {
    ...authOptions,
    body: JSON.stringify(input),
  });
  if (!response.ok)
    throw new Error(
      response.status === 409
        ? 'An account with this phone already exists.'
        : 'Could not create your account. Check the backend and try again.',
    );
  const account = await accept(response);
  localStorage.removeItem(signedOutKey);
  return account;
}

export class AccountApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function throwApiError(response: Response): Promise<never> {
  const body: unknown = await response.json().catch(() => null);
  const message =
    body &&
    typeof body === 'object' &&
    'error' in body &&
    body.error &&
    typeof body.error === 'object' &&
    'message' in body.error &&
    typeof body.error.message === 'string'
      ? body.error.message
      : 'Unable to complete your request. Please try again.';
  throw new AccountApiError(message, response.status);
}

export async function recoveryRequest(
  path: 'request' | 'verify' | 'reset',
  input: object,
) {
  const response = await fetch(`${apiBaseUrl}/accounts/recovery/${path}`, {
    ...authOptions,
    body: JSON.stringify(input),
  });
  if (!response.ok) await throwApiError(response);
}
