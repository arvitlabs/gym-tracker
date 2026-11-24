import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import OnboardingStep from '../components/OnboardingStep';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { OnboardingContext, type BodyGoal } from '../OnboardingLayout';
import { signOut } from '../../account/data/session';
import { toast } from 'sonner';

const fields = [
  { key: 'height', label: 'Height', unit: 'cm', inputMode: 'decimal' },
  { key: 'weight', label: 'Weight', unit: 'kg', inputMode: 'decimal' },
  { key: 'age', label: 'Age', unit: 'yrs', inputMode: 'numeric' },
] as const;

const goals = [
  { value: 'Build muscle', detail: 'Get bigger and stronger' },
  { value: 'General fitness', detail: 'Feel fit and move better' },
];

const optionStyles = {
  minHeight: 48,
  border: '1.5px solid #3A3B35',
  color: '#F3F1EA',
  backgroundColor: '#1E1F1B',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-body)',
  textTransform: 'none',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#1A0E06',
    backgroundColor: '#FF7A3D',
    borderColor: '#FF7A3D',
  },
  '&:hover': { backgroundColor: '#30312A' },
  '&.Mui-focusVisible': { outline: '2px solid #C8F25A', outlineOffset: '2px' },
};

export default function BodyGoalPage() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('Onboarding context missing');
  const { answers, setAnswers } = context;
  const [errors, setErrors] = useState<Partial<Record<keyof BodyGoal, string>>>(
    {},
  );
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof BodyGoal, string>> = {};
    for (const key of ['height', 'weight'] as const) {
      const value = Number(answers[key]);
      if (
        !answers[key].trim() ||
        !Number.isFinite(value) ||
        value <= 0 ||
        value > 999.99 ||
        !/^\d+(\.\d{1,2})?$/.test(answers[key])
      )
        next[key] =
          'Enter a positive number up to 999.99 with at most two decimal places.';
    }
    if (
      !/^\d+$/.test(answers.age) ||
      Number(answers.age) < 1 ||
      Number(answers.age) > 2147483647
    )
      next.age = 'Enter a positive whole number.';
    if (!answers.gender) next.gender = 'Choose a gender.';
    if (!answers.goal) next.goal = 'Choose a goal.';
    setErrors(next);
    if (Object.keys(next).length === 0) navigate('/onboarding/preferences');
  }

  return (
    <OnboardingStep step={1}>
      <form noValidate onSubmit={submit} className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-3 gap-2">
          {fields.map(({ key, label, unit, inputMode }) => (
            <div key={key} className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor={key}
                className="text-label uppercase tracking-wide text-[#A3A197]"
              >
                {label}
              </label>
              <InputGroup className="h-auto min-h-[54px] rounded-xl border-[#3A3B35] bg-[#1E1F1B] focus-within:ring-[#C8F25A]">
                <InputGroupInput
                  id={key}
                  type="text"
                  inputMode={inputMode}
                  value={answers[key]}
                  onChange={(event) => {
                    setAnswers({ ...answers, [key]: event.target.value });
                    setErrors({ ...errors, [key]: undefined });
                  }}
                  aria-invalid={Boolean(errors[key])}
                  aria-describedby={errors[key] ? key + '-error' : undefined}
                  className="min-w-0 px-2 text-body text-[#F3F1EA] md:text-body"
                />
                <InputGroupAddon align="inline-end" className="pr-2">
                  <InputGroupText className="text-body text-[#A3A197]">
                    {unit}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors[key] && (
                <p id={key + '-error'} className="text-body text-[#FFB4A2]">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
        </div>
        <fieldset
          className="flex flex-col gap-2"
          aria-describedby={errors.gender ? 'gender-error' : undefined}
        >
          <legend className="mb-2 text-label uppercase tracking-wide text-[#A3A197]">
            Gender
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.gender || null}
            onChange={(_, value: string | null) => {
              if (value) {
                setAnswers({ ...answers, gender: value });
                setErrors({ ...errors, gender: undefined });
              }
            }}
            aria-label="Gender"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              '& .MuiToggleButtonGroup-grouped': {
                borderRadius: '999px !important',
                border: '1.5px solid #3A3B35 !important',
                margin: '0 !important',
              },
              '& .MuiToggleButtonGroup-grouped.Mui-selected': {
                borderColor: '#FF7A3D !important',
              },
            }}
          >
            {['Male', 'Female', 'Prefer not to say'].map((gender) => (
              <ToggleButton
                key={gender}
                value={gender}
                sx={{ ...optionStyles, padding: '8px 16px' }}
              >
                {gender}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {errors.gender && (
            <p id="gender-error" className="text-body text-[#FFB4A2]">
              {errors.gender}
            </p>
          )}
        </fieldset>
        <fieldset
          className="flex flex-col gap-2"
          aria-describedby={errors.goal ? 'goal-error' : undefined}
        >
          <legend className="mb-2 text-label uppercase tracking-wide text-[#A3A197]">
            Main goal
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.goal || null}
            onChange={(_, value: string | null) => {
              if (value) {
                setAnswers({ ...answers, goal: value });
                setErrors({ ...errors, goal: undefined });
              }
            }}
            aria-label="Main goal"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 1,
              '& .MuiToggleButtonGroup-grouped': {
                borderRadius: '14px !important',
                border: '1.5px solid #3A3B35 !important',
                margin: '0 !important',
              },
              '& .MuiToggleButtonGroup-grouped.Mui-selected': {
                borderColor: '#FF7A3D !important',
              },
            }}
          >
            {goals.map((goal) => (
              <ToggleButton
                key={goal.value}
                value={goal.value}
                sx={{
                  ...optionStyles,
                  minWidth: 0,
                  minHeight: 74,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '2px',
                  padding: '10px',
                  textAlign: 'left',
                  lineHeight: 1.25,
                }}
              >
                <span>{goal.value}</span>
                <span className="text-label opacity-75">{goal.detail}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {errors.goal && (
            <p id="goal-error" className="text-body text-[#FFB4A2]">
              {errors.goal}
            </p>
          )}
        </fieldset>
        <Button
          type="submit"
          className="mt-auto min-h-14 w-full rounded-2xl bg-[#FF7A3D] px-5 font-display [font-size:var(--text-title)] font-bold uppercase text-[#1A0E06] hover:bg-[#ff8c59] focus-visible:ring-[#C8F25A]"
        >
          Next
        </Button>
      </form>
      <Button
        type="button"
        variant="ghost"
        className="mt-4 min-h-12 self-start px-0 text-body text-[#A3A197] underline hover:bg-transparent hover:text-[#F3F1EA]"
        onClick={async () => {
          const request = signOut();
          navigate('/log-in', { replace: true });
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
      </Button>
    </OnboardingStep>
  );
}
