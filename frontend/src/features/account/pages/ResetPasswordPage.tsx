import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Input } from '@/components/ui/input';
import { recoveryRequest } from '../data/session';
import { recoveryDraft } from '../recovery-draft';
import FormMessage from '../components/FormMessage';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!recoveryDraft.phone || !recoveryDraft.code) {
      setMessage('Please start password recovery again.');
      return;
    }
    if (password.length < 8) {
      setMessage('Use at least 8 characters for your password.');
      return;
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }
    setPending(true);
    setMessage('');
    try {
      await recoveryRequest('reset', { ...recoveryDraft, password });
      recoveryDraft.phone = '';
      recoveryDraft.code = '';
      setPassword('');
      setConfirm('');
      setSuccess(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to connect.');
    } finally {
      setPending(false);
    }
  }
  const field =
    'text-body min-h-[54px] rounded-2xl border-[#3A3B35] bg-[#20211D] text-[#F3F1EA] md:text-body';
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA]">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center gap-4">
        {success ? (
          <>
            <p role="status" className="text-body">
              Password changed successfully.
            </p>
            <Link
              to="/log-in"
              className="text-center text-body rounded-2xl bg-[#FF7A3D] p-4 font-semibold text-[#1A0E06]"
            >
              Sign in
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <label htmlFor="new-password" className="text-label">
              New password
            </label>
            <Input
              id="new-password"
              className={field}
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirm-password" className="text-label">
              Confirm password
            </label>
            <Input
              id="confirm-password"
              className={field}
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <FormMessage message={message} />
            {message && (
              <Link to="/log-in" className="text-body text-[#C8F25A] underline">
                Sign in
              </Link>
            )}
            <button
              disabled={pending}
              className="text-body min-h-[54px] rounded-2xl bg-[#FF7A3D] px-5 font-semibold text-[#1A0E06] disabled:opacity-50"
            >
              {pending ? 'Changing password…' : 'Change password'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
