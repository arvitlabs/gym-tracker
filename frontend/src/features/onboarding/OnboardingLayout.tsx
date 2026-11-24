import { createContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { current, type Account } from '../account/data/session';

export type BodyGoal = {
  height: string;
  weight: string;
  age: string;
  gender: string;
  goal: string;
};

export type OnboardingAnswers = BodyGoal & {
  experience: string;
  location: string;
  days: number | null;
  deskJob: string;
  painAreas: string[];
  postureConcerns: string[];
};

export const OnboardingContext = createContext<{
  answers: OnboardingAnswers;
  setAnswers: (answers: OnboardingAnswers) => void;
} | null>(null);

export default function OnboardingLayout() {
  const [account, setAccount] = useState<Account | null | undefined>();
  const [failed, setFailed] = useState(false);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: '',
    experience: '',
    location: '',
    days: null,
    deskJob: '',
    painAreas: [],
    postureConcerns: [],
  });

  useEffect(() => {
    let active = true;
    current()
      .then((result) => {
        if (active) setAccount(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (failed)
    return (
      <main role="alert">Could not connect. Please reload and try again.</main>
    );
  if (account === undefined) return <main role="status">Loading…</main>;
  if (!account) return <Navigate to="/log-in" replace />;
  if (account.destination !== '/onboarding')
    return <Navigate to={account.destination} replace />;
  return (
    <OnboardingContext.Provider value={{ answers, setAnswers }}>
      <Outlet />
    </OnboardingContext.Provider>
  );
}
