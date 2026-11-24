import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { current, signOut, type Account } from '../data/session';
import WelcomePage from './WelcomePage';
import { toast } from 'sonner';
export default function SessionPage() {
  const [account, setAccount] = useState<Account | null | undefined>(undefined);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    let active = true;
    current()
      .then((result) => {
        if (active) setAccount(result);
      })
      .catch(() => {
        if (active) setError('Could not connect. Please try again.');
      });
    return () => {
      active = false;
    };
  }, [retry]);
  if (error)
    return (
      <main>
        <p role="alert">{error}</p>
        <button
          onClick={() => {
            setError('');
            setRetry(retry + 1);
          }}
        >
          Retry
        </button>
      </main>
    );
  if (account === undefined) return <main role="status">Loading…</main>;
  if (!account)
    return pathname === '/' ? (
      <WelcomePage />
    ) : (
      <Navigate to="/log-in" replace />
    );
  if (pathname !== account.destination)
    return <Navigate to={account.destination} replace />;
  return (
    <main className="flex-1 bg-[#131411] px-5 py-8 text-[#F3F1EA]">
      <section className="mx-auto flex max-w-sm flex-col gap-5">
        <p className="text-body">Welcome, {account.name}.</p>
        <button
          className="min-h-12 rounded-xl border text-body"
          onClick={async () => {
            const request = signOut();
            setAccount(null);
            try {
              await request;
              toast.success('Signed out');
            } catch {
              toast.error(
                'Signed out on this device. Server sign-out could not be confirmed.',
              );
            }
          }}
        >
          Sign out
        </button>
      </section>
    </main>
  );
}
