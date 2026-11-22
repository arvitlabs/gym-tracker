import PageLayout from './components/PageHeader';
import SessionPage from './features/account/SessionPage';
import { Toaster } from './components/ui/sonner';
import { Navigate, Route, Routes } from 'react-router';
import AccountEntryPage from './features/account/AccountEntryPage';
import PhoneCodePage from './features/account/PhoneCodePage';
import WelcomePage from './features/account/WelcomePage';
import HealthCheckPage from './features/system/HealthCheckPage';

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<PageLayout title="Gym Tracker" />}>
          <Route
            path="/"
            element={import.meta.env.DEV ? <SessionPage /> : <WelcomePage />}
          />
        </Route>
        {import.meta.env.DEV &&
          [
            ['/home', 'Today'],
            ['/onboarding', 'Body & Goal'],
            ['/onboarding/plan', 'Your first plan'],
          ].map(([path, title]) => (
            <Route key={path} element={<PageLayout title={title} />}>
              <Route path={path} element={<SessionPage />} />
            </Route>
          ))}
        {(['Sign up', 'Log in'] as const).map((title) => (
          <Route key={title} element={<PageLayout title={title} backTo="/" />}>
            <Route
              path={title === 'Sign up' ? '/sign-up' : '/log-in'}
              element={<AccountEntryPage title={title} />}
            />
          </Route>
        ))}
        {import.meta.env.DEV && (
          <Route
            element={<PageLayout title="Verify your phone" backTo="/sign-up" />}
          >
            <Route path="/verify-phone" element={<PhoneCodePage />} />
          </Route>
        )}
        <Route element={<PageLayout title="Connection check" backTo="/" />}>
          <Route path="/health-check" element={<HealthCheckPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
