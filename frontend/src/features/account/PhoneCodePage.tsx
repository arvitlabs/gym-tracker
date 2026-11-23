import { accept, authOptions, draft, setDraft } from './session';
import { toast } from 'sonner';
import { apiBaseUrl } from '../../config';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

export default function PhoneCodePage() {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) {
      setMessage('Please start sign up again.');
      return;
    }
    setPending(true);
    setMessage('');
    try {
      const response = await fetch(`${apiBaseUrl}/accounts/signup`, {
        ...authOptions,
        body: JSON.stringify({ ...draft, code }),
      });
      if (!response.ok)
        throw new Error(
          response.status === 409
            ? 'An account with this phone already exists.'
            : 'Could not create your account. Check the backend and try again.',
        );
      const account = await accept(response);
      setDraft(null);
      toast.success('Account created and signed in');
      navigate(account.destination, { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to connect.');
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA] sm:px-8">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center gap-5">
        <p className="text-body text-[#A3A197]">Development code: 000000</p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="text-label flex flex-col gap-2">
            Verification code
            <input
              className="text-body min-h-[54px] w-full rounded-2xl border border-[#3A3B35] bg-[#20211D] px-4"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              required
            />
          </label>
          {message && (
            <p role="status" className="text-body">
              {message}
            </p>
          )}
          <button
            disabled={pending}
            className="text-body min-h-[54px] rounded-2xl bg-[#FF7A3D] px-5 font-semibold text-[#1A0E06] disabled:opacity-50"
          >
            {pending ? 'Creating account…' : 'Verify and create account'}
          </button>
        </form>
      </section>
    </main>
  );
}
