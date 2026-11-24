import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button } from '@/components/ui/button';
import { OnboardingContext } from '../OnboardingLayout';
import OnboardingStep from '../components/OnboardingStep';
import { choiceGroupStyles, choiceStyles } from '../components/choice-styles';

const painOptions = [
  'Neck',
  'Shoulders',
  'Upper back',
  'Lower back',
  'Hips',
  'Knees',
  'Elbows',
  'None',
];
const postureOptions = [
  'Forward head',
  'Rounded shoulders',
  'Lower-back arch',
  'Not sure',
];

export default function LifestylePage() {
  const context = useContext(OnboardingContext);
  const navigate = useNavigate();
  if (
    !context?.answers.goal ||
    !context.answers.days ||
    !context.answers.experience ||
    !context.answers.location
  )
    return <Navigate to="/onboarding" replace />;
  const { answers, setAnswers } = context;

  function selectMultiple(
    key: 'painAreas' | 'postureConcerns',
    values: string[],
    exclusive: string,
  ) {
    const previous = answers[key];
    const pickedExclusive =
      values.includes(exclusive) && !previous.includes(exclusive);
    const next = pickedExclusive
      ? [exclusive]
      : values.filter((value) => value !== exclusive);
    setAnswers({ ...answers, [key]: next });
  }

  return (
    <OnboardingStep step={3}>
      <div className="flex flex-1 flex-col gap-6">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-body">
            Does your job involve sitting at a desk most of the day with little
            movement?
          </legend>
          <ToggleButtonGroup
            exclusive
            value={answers.deskJob || null}
            onChange={(_, value: string | null) => {
              if (value) setAnswers({ ...answers, deskJob: value });
            }}
            aria-label="Desk job"
            sx={choiceGroupStyles}
          >
            {['Yes', 'No'].map((value) => (
              <ToggleButton key={value} value={value} sx={choiceStyles}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </fieldset>
        {(
          [
            {
              key: 'painAreas',
              title: 'Any pain or discomfort? Pick all that apply',
              options: painOptions,
              exclusive: 'None',
            },
            {
              key: 'postureConcerns',
              title: 'Posture concerns? Pick all that apply',
              options: postureOptions,
              exclusive: 'Not sure',
            },
          ] as const
        ).map(({ key, title, options, exclusive }) => (
          <fieldset key={key} className="flex flex-col gap-2">
            <legend className="mb-2 text-body">{title}</legend>
            <ToggleButtonGroup
              value={answers[key]}
              onChange={(_, values: string[]) =>
                selectMultiple(key, values, exclusive)
              }
              aria-label={title}
              sx={choiceGroupStyles}
            >
              {options.map((value) => (
                <ToggleButton key={value} value={value} sx={choiceStyles}>
                  {value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </fieldset>
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <Button
            type="button"
            onClick={() => navigate('/onboarding/review')}
            className="min-h-14 w-full rounded-2xl bg-[#FF7A3D] font-display [font-size:var(--text-title)] font-bold uppercase text-[#1A0E06] hover:bg-[#ff8c59]"
          >
            Next
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setAnswers({
                ...answers,
                deskJob: '',
                painAreas: [],
                postureConcerns: [],
              });
              navigate('/onboarding/review');
            }}
            className="min-h-12 text-body text-[#A3A197] hover:bg-transparent hover:text-[#F3F1EA]"
          >
            Skip
          </Button>
        </div>
      </div>
    </OnboardingStep>
  );
}
