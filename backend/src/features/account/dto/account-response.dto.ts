export type AccountView = {
  name: string;
  destination: '/onboarding' | '/onboarding/plan' | '/home';
};
export type SessionResponseDto = AccountView & { accessToken: string };
