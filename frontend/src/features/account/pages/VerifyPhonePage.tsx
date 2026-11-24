import { signup } from '../data/session';
import { draft, setDraft } from '../signup-draft';
import { toast } from 'sonner';
import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import TextField from '@mui/material/TextField';
import { recoveryRequest } from '../data/session';
import { recoveryDraft } from '../recovery-draft';
import FormMessage from '../components/FormMessage';

export default function VerifyPhonePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const recovery = params.get('purpose') === 'recovery';

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (recovery && !recoveryDraft.phone) {
      setMessage('Please start password recovery again.');
      return;
    }
    if (!recovery && !draft) {
      setMessage('Please start sign up again.');
      return;
    }
    setPending(true);
    setMessage('');
    try {
      if (recovery) {
        await recoveryRequest('verify', { phone: recoveryDraft.phone, code });
        recoveryDraft.code = code;
        navigate('/reset-password');
        return;
      }
      if (!draft) return;
      const account = await signup({ ...draft, code });
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
            <TextField
              id="verification-code"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              autoComplete="one-time-code"
              slotProps={{
                htmlInput: {
                  inputMode: 'numeric',
                  maxLength: 6,
                  'aria-label': 'Verification code',
                },
              }}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  minHeight: 54,
                  backgroundColor: '#20211D',
                  fontSize: 'var(--text-body)',
                },
              }}
            />
          </label>
          <FormMessage message={message} />
          <button
            disabled={pending}
            className="text-body min-h-[54px] rounded-2xl bg-[#FF7A3D] px-5 font-semibold text-[#1A0E06] disabled:opacity-50"
          >
            {pending
              ? 'Please wait…'
              : recovery
                ? 'Verify code'
                : 'Verify and create account'}
          </button>
        </form>
      </section>
    </main>
  );
}
