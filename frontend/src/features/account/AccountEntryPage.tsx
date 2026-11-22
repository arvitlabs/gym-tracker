import { isPossiblePhoneNumber } from 'react-phone-number-input';
import PhoneNumberField from './PhoneNumberField';
import { apiBaseUrl } from '../../config';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';

type Props = Readonly<{ title: 'Sign up' | 'Log in' }>;
const field =
  'text-body min-h-[54px] w-full rounded-2xl border border-[#3A3B35] bg-[#20211D] px-4 text-[#F3F1EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8F25A]';
export default function AccountEntryPage({ title }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const signup = title === 'Sign up';
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!phone || !isPossiblePhoneNumber(phone)) {
      setMessage('Enter a valid phone number for the selected country.');
      return;
    }
    if (password.length < 8) {
      setMessage('Use at least 8 characters for your password.');
      return;
    }
    if (signup) {
      if (!name.trim()) {
        setMessage('Enter your name.');
        return;
      }
      navigate('/verify-phone', {
        state: { name: name.trim(), phone, password },
      });
      return;
    }
    setPending(true);
    setMessage('');
    try {
      const response = await fetch(`${apiBaseUrl}/dev/accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? 'Invalid phone or password.'
            : 'Login is unavailable. Check the backend and try again.',
        );
      const data: { name: string } = await response.json();
      setPassword('');
      setMessage(`Welcome, ${data.name}. Login details are correct.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to connect.');
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="flex min-h-dvh flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA] sm:px-8">
      <Link
        to="/"
        className="font-display text-brand w-fit uppercase text-[#A3A197]"
      >
        Gym Tracker
      </Link>
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center gap-5">
        <h1 className="font-display text-title uppercase">{title}</h1>
        {!import.meta.env.DEV ? (
          <p className="text-body">Account access is not available yet.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            {signup && (
              <label className="text-label flex flex-col gap-2">
                Name
                <input
                  className={field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </label>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-label">
                Phone number
              </label>
              <PhoneNumberField value={phone} onChange={setPhone} />
            </div>
            <label className="text-label flex flex-col gap-2">
              Password
              <input
                className={field}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={signup ? 'new-password' : 'current-password'}
                minLength={8}
                maxLength={128}
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
              {pending ? 'Please wait…' : signup ? 'Continue' : 'Log in'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
