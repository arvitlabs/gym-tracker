import PageLayout from './components/layout/PageLayout';
import SessionPage from './features/account/pages/SessionPage';
import { Toaster } from './components/ui/toast';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import SignUpPage from './features/account/pages/SignUpPage';
import SignInPage from './features/account/pages/SignInPage';
import VerifyPhonePage from './features/account/pages/VerifyPhonePage';
import ForgotPasswordPage from './features/account/pages/ForgotPasswordPage';
import ResetPasswordPage from './features/account/pages/ResetPasswordPage';
import OnboardingLayout from './features/onboarding/OnboardingLayout';
import BodyGoalPage from './features/onboarding/pages/BodyGoalPage';
import PreferencesPage from './features/onboarding/pages/PreferencesPage';
import LifestylePage from './features/onboarding/pages/LifestylePage';
import ReviewPage from './features/onboarding/pages/ReviewPage';
import PlanPreviewPage from './features/onboarding/pages/PlanPreviewPage';
import HealthCheckPage from './features/system/pages/HealthCheckPage';

export default function App() {
  const location = useLocation();
  const recoveryVerification =
    new URLSearchParams(location.search).get('purpose') === 'recovery';
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<PageLayout title="Gym Tracker" />}>
          <Route path="/" element={<SessionPage />} />
        </Route>
        {[
          ['/home', 'Today'],
          ['/onboarding/plan', 'Your first plan'],
        ].map(([path, title]) => (
          <Route key={path} element={<PageLayout title={title} />}>
            <Route path={path} element={<SessionPage />} />
          </Route>
        ))}
        <Route element={<OnboardingLayout />}>
          <Route element={<PageLayout title="About you" />}>
            <Route path="/onboarding" element={<BodyGoalPage />} />
          </Route>
          <Route
            element={<PageLayout title="How you train" backTo="/onboarding" />}
          >
            <Route
              path="/onboarding/preferences"
              element={<PreferencesPage />}
            />
          </Route>
          <Route
            element={
              <PageLayout
                title="Lifestyle & body"
                backTo="/onboarding/preferences"
              />
            }
          >
            <Route path="/onboarding/lifestyle" element={<LifestylePage />} />
          </Route>
          <Route
            element={
              <PageLayout title="All set?" backTo="/onboarding/lifestyle" />
            }
          >
            <Route path="/onboarding/review" element={<ReviewPage />} />
          </Route>
          <Route
            element={
              <PageLayout title="Your plan" backTo="/onboarding/review" />
            }
          >
            <Route
              path="/onboarding/plan-preview"
              element={<PlanPreviewPage />}
            />
          </Route>
        </Route>
        <Route element={<PageLayout title="Sign up" backTo="/" />}>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<PageLayout title="Log in" backTo="/" />}>
          <Route path="/log-in" element={<SignInPage />} />
        </Route>
        <Route
          element={<PageLayout title="Forgot password" backTo="/log-in" />}
        >
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route
          element={
            <PageLayout title="Reset password" backTo="/forgot-password" />
          }
        >
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        {import.meta.env.DEV && (
          <Route
            element={
              <PageLayout
                title="Verify your phone"
                backTo={recoveryVerification ? '/forgot-password' : '/sign-up'}
              />
            }
          >
            <Route path="/verify-phone" element={<VerifyPhonePage />} />
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
