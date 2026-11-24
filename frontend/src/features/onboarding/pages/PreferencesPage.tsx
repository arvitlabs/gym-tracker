import { useContext, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button } from '@/components/ui/button';
import { OnboardingContext } from '../OnboardingLayout';
import OnboardingStep from '../components/OnboardingStep';
import { choiceGroupStyles, choiceStyles } from '../components/choice-styles';

export default function PreferencesPage() {
  const context = useContext(OnboardingContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  if (!context?.answers.goal) return <Navigate to="/onboarding" replace />;
  const { answers, setAnswers } = context;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answers.experience || !answers.location || !answers.days) {
      setError('Choose your experience, location, and training days.');
      return;
    }
    navigate('/onboarding/lifestyle');
  }

  const grid = {
    ...choiceGroupStyles,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  };
  const card = {
    ...choiceStyles,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    lineHeight: 1.25,
    padding: '12px',
    minHeight: 70,
  };
  return (
    <OnboardingStep step={2}>
      <form onSubmit={submit} className="flex flex-1 flex-col gap-6">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-label uppercase tracking-wide text-[#A3A197]">
            Experience
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.experience || null}
            onChange={(_, value: string | null) => {
              if (value) {
                setAnswers({ ...answers, experience: value });
                setError('');
              }
            }}
            aria-label="Experience"
            sx={grid}
          >
            {[
              ['Beginner', 'New or under 6 months'],
              ['Intermediate', '6 months or more'],
            ].map(([value, detail]) => (
              <ToggleButton key={value} value={value} sx={card}>
                <span>{value}</span>
                <span className="text-label opacity-75">{detail}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-label uppercase tracking-wide text-[#A3A197]">
            Where
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.location || null}
            onChange={(_, value: string | null) => {
              if (value) {
                setAnswers({ ...answers, location: value });
                setError('');
              }
            }}
            aria-label="Where you train"
            sx={grid}
          >
            {[
              ['Gym', 'Full equipment'],
              ['Home', 'Bodyweight only'],
            ].map(([value, detail]) => (
              <ToggleButton key={value} value={value} sx={card}>
                <span>{value}</span>
                <span className="text-label opacity-75">{detail}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-label uppercase tracking-wide text-[#A3A197]">
            Days per week
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.days}
            onChange={(_, value: number | null) => {
              if (value) {
                setAnswers({ ...answers, days: value });
                setError('');
              }
            }}
            aria-label="Training days per week"
            sx={grid}
          >
            {[4, 5].map((value) => (
              <ToggleButton key={value} value={value} sx={card}>
                <span>{value} days</span>
                <span className="text-label opacity-75">
                  {7 - value} rest days
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </fieldset>
        {answers.experience && answers.location && answers.days && (
          <p className="text-body text-[#A3A197]">
            Your plan: {answers.days}-day{' '}
            {answers.location === 'Gym' ? 'gym split' : 'home bodyweight plan'},{' '}
            {answers.experience.toLowerCase()} exercises, {7 - answers.days}{' '}
            rest days.
          </p>
        )}
        {error && (
          <p role="alert" className="text-body text-[#FFB4A2]">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="mt-auto min-h-14 w-full rounded-2xl bg-[#FF7A3D] font-display [font-size:var(--text-title)] font-bold uppercase text-[#1A0E06] hover:bg-[#ff8c59]"
        >
          Next
        </Button>
      </form>
    </OnboardingStep>
  );
}
