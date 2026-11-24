import { useContext } from 'react';
import { Link, Navigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { OnboardingContext } from '../OnboardingLayout';
import OnboardingStep from '../components/OnboardingStep';

export default function ReviewPage() {
  const context = useContext(OnboardingContext);
  if (
    !context?.answers.goal ||
    !context.answers.days ||
    !context.answers.experience ||
    !context.answers.location
  )
    return <Navigate to="/onboarding" replace />;
  const { answers } = context;
  const days = answers.days;
  if (days === null) return <Navigate to="/onboarding/preferences" replace />;
  const sections = [
    {
      title: 'About you',
      to: '/onboarding',
      rows: [
        ['Height · weight', `${answers.height} cm · ${answers.weight} kg`],
        ['Age · gender', `${answers.age} · ${answers.gender}`],
        ['Goal', answers.goal],
      ],
    },
    {
      title: 'Training',
      to: '/onboarding/preferences',
      rows: [
        ['Experience', answers.experience],
        [
          'Where',
          answers.location === 'Gym'
            ? 'Gym · full equipment'
            : 'Home · bodyweight only',
        ],
        ['Schedule', `${days} days · ${7 - days} rest`],
      ],
    },
    {
      title: 'Lifestyle & body',
      to: '/onboarding/lifestyle',
      rows: [
        ['Desk job', answers.deskJob || 'Not answered'],
        ['Pain areas', answers.painAreas.join(', ') || 'Not answered'],
        ['Posture', answers.postureConcerns.join(', ') || 'Not answered'],
      ],
    },
  ];
  return (
    <OnboardingStep step={4}>
      <div className="flex flex-1 flex-col gap-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-[#3A3B35] bg-[#1E1F1B] p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-body font-semibold">{section.title}</h2>
              <Link
                className="text-body text-[#FF7A3D] underline"
                to={section.to}
              >
                Edit<span className="sr-only"> {section.title}</span>
              </Link>
            </div>
            <dl className="flex flex-col gap-2">
              {section.rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 text-body"
                >
                  <dt className="text-[#A3A197]">{label}</dt>
                  <dd className="min-w-0 text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <p className="text-body text-[#A3A197]">
          General exercise guidance, not medical advice. Stop any exercise that
          causes pain.
        </p>
        <div className="mt-auto flex flex-col gap-2">
          <Button
            disabled
            className="min-h-14 w-full rounded-2xl bg-[#FF7A3D] font-display [font-size:var(--text-title)] font-bold uppercase text-[#1A0E06]"
          >
            Generate my plan
          </Button>
          <p className="text-body text-[#A3A197]">
            Plan generation is coming next.
          </p>
          <Link
            to="/onboarding/plan-preview"
            className="min-h-12 text-center text-body text-[#C8F25A] underline"
          >
            Preview the plan screen
          </Link>
        </div>
      </div>
    </OnboardingStep>
  );
}
