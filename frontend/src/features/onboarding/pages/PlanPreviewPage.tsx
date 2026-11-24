import { useContext } from 'react';
import { Navigate } from 'react-router';
import Paper from '@mui/material/Paper';
import { Button } from '@/components/ui/button';
import { OnboardingContext } from '../OnboardingLayout';

const samplePlans = {
  Gym: {
    4: [
      ['Upper body A', 5],
      ['Lower body A', 5],
      ['Upper body B', 5],
      ['Lower body B', 5],
    ],
    5: [
      ['Chest & triceps', 5],
      ['Back & biceps', 5],
      ['Legs', 5],
      ['Shoulders & core', 5],
      ['Full body', 4],
    ],
  },
  Home: {
    4: [
      ['Upper body', 5],
      ['Lower body', 5],
      ['Core & back', 4],
      ['Full body', 5],
    ],
    5: [
      ['Push · chest & arms', 5],
      ['Legs & glutes', 5],
      ['Core', 4],
      ['Back & posture', 4],
      ['Full body', 5],
    ],
  },
} as const;

export default function PlanPreviewPage() {
  const context = useContext(OnboardingContext);
  if (!context?.answers.goal) return <Navigate to="/onboarding" replace />;
  const { location, days, experience } = context.answers;
  if (
    (location !== 'Gym' && location !== 'Home') ||
    (days !== 4 && days !== 5) ||
    !experience
  )
    return <Navigate to="/onboarding/preferences" replace />;
  const plan = samplePlans[location][days];
  const trainingDays = days === 4 ? [0, 1, 3, 4] : [0, 1, 2, 3, 4];
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 py-7 text-[#F3F1EA] sm:px-8">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col gap-5">
        <p role="status" className="text-body text-[#A3A197]">
          Prototype preview. Your plan has not been generated or saved.
        </p>
        <h2 className="font-display text-title font-bold uppercase">
          {location} {days}-day {location === 'Gym' ? 'split' : 'bodyweight'}
        </h2>
        <div
          className="grid grid-cols-7 gap-1"
          aria-label="Sample training week"
        >
          {weekdays.map((day, index) => (
            <div
              key={day}
              className="flex min-w-0 flex-col items-center gap-2 text-label text-[#A3A197]"
            >
              <span>{day.slice(0, 1)}</span>
              <span
                className={`h-1 w-full rounded ${trainingDays.includes(index) ? 'bg-[#FF7A3D]' : 'bg-[#3A3B35]'}`}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {weekdays.map((weekday, index) => {
            const exerciseIndex = trainingDays.indexOf(index);
            const item = exerciseIndex >= 0 ? plan[exerciseIndex] : undefined;
            return (
              <Paper
                key={weekday}
                elevation={0}
                sx={{
                  backgroundColor: item ? '#1E1F1B' : 'transparent',
                  border: '1px solid #3A3B35',
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span className="w-10 shrink-0 text-label text-[#A3A197]">
                  {weekday}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-label text-[#FF7A3D]">
                    {item ? `Day ${exerciseIndex + 1}` : 'Rest'}
                  </span>
                  <span className="text-body">
                    {item ? item[0] : 'Rest & recover'}
                  </span>
                </div>
                {item && (
                  <span className="text-label text-[#A3A197]">
                    {item[1]} exercises
                  </span>
                )}
              </Paper>
            );
          })}
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <Button
            disabled
            className="min-h-14 w-full rounded-2xl bg-[#FF7A3D] font-display [font-size:var(--text-title)] font-bold uppercase text-[#1A0E06]"
          >
            Looks good
          </Button>
          <Button
            disabled
            variant="outline"
            className="min-h-12 w-full border-[#3A3B35] bg-[#20211D] text-body text-[#A3A197] disabled:opacity-100"
          >
            Reorder days
          </Button>
        </div>
      </section>
    </main>
  );
}
