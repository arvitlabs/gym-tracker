import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { AccountApiError, recoveryRequest } from '../data/session';
import { recoveryDraft } from '../recovery-draft';
import FormMessage from '../components/FormMessage';

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [missing, setMissing] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMissing(false);
    if (!phone || !isPossiblePhoneNumber(phone)) {
      setMessage('Enter a valid phone number.');
      return;
    }
    setPending(true);
    setMessage('');
    try {
      await recoveryRequest('request', { phone });
      recoveryDraft.phone = phone;
      recoveryDraft.code = '';
      navigate('/verify-phone?purpose=recovery');
    } catch (error) {
      setMissing(error instanceof AccountApiError && error.status === 404);
      setMessage(error instanceof Error ? error.message : 'Unable to connect.');
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA]">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label htmlFor="phone" className="text-label">
            Phone number
          </label>
          <PhoneInput
            id="phone"
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            required
          />
          <FormMessage message={message} showSignUp={missing} />
          <button
            disabled={pending}
            className="text-body min-h-[54px] rounded-2xl bg-[#FF7A3D] px-5 font-semibold text-[#1A0E06] disabled:opacity-50"
          >
            {pending ? 'Please wait…' : 'Send OTP'}
          </button>
        </form>
      </section>
    </main>
  );
}
