import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { toast } from 'sonner';
import { AccountApiError, login } from '../data/session';
import FormMessage from '../components/FormMessage';

export default function SignInPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [accountMissing, setAccountMissing] = useState(false);
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountMissing(false);
    if (!phone || !isPossiblePhoneNumber(phone)) {
      setMessage('Enter a valid phone number for the selected country.');
      return;
    }
    if (password.length < 8) {
      setMessage('Use at least 8 characters for your password.');
      return;
    }
    setPending(true);
    setMessage('');
    try {
      const data = await login(phone, password);
      setPassword('');
      toast.success('Signed in');
      navigate(data.destination, { replace: true });
    } catch (error) {
      setAccountMissing(
        error instanceof AccountApiError && error.status === 404,
      );
      setMessage(error instanceof Error ? error.message : 'Unable to connect.');
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA] sm:px-8">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center gap-5">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-label">
              Phone number
            </label>
            <PhoneInput
              id="phone"
              defaultCountry="IN"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
              placeholder="Phone number"
              required
            />
          </div>
          <div className="text-label flex flex-col gap-2">
            <label htmlFor="account-password">Password</label>
            <span className="relative block">
              <Input
                id="account-password"
                className={`text-body min-h-[54px] w-full rounded-2xl border border-[#3A3B35] bg-[#20211D] px-4 text-[#F3F1EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8F25A] pr-14 md:text-body`}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                minLength={8}
                maxLength={128}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl text-[#A3A197] focus-visible:outline-2 focus-visible:outline-[#C8F25A]"
              >
                {showPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </Button>
            </span>
          </div>
          <Link
            to="/forgot-password"
            className="self-end text-body text-[#C8F25A] underline"
          >
            Forgot password?
          </Link>
          <FormMessage message={message} showSignUp={accountMissing} />
          <button
            disabled={pending}
            className="text-body min-h-[54px] rounded-2xl bg-[#FF7A3D] px-5 font-semibold text-[#1A0E06] disabled:opacity-50"
          >
            {pending ? 'Please wait…' : 'Log in'}
          </button>
        </form>
      </section>
    </main>
  );
}
