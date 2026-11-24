import type { ReactNode } from 'react';
import MobileStepper from '@mui/material/MobileStepper';

export default function OnboardingStep({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col bg-[#131411] px-5 pb-10 pt-7 text-[#F3F1EA] sm:px-8">
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col">
        <MobileStepper
          variant="dots"
          steps={4}
          activeStep={step - 1}
          position="static"
          role="group"
          aria-label={`Step ${step} of 4`}
          backButton={null}
          nextButton={
            <span className="text-label text-[#A3A197]" aria-hidden="true">
              {step}/4
            </span>
          }
          sx={{
            padding: 0,
            marginBottom: '28px',
            gap: '16px',
            backgroundColor: 'transparent',
            '& .MuiMobileStepper-dots': { flex: 1, gap: '4px' },
            '& .MuiMobileStepper-dot': {
              flex: 1,
              height: 4,
              margin: 0,
              borderRadius: '2px',
              backgroundColor: '#2E2F2A',
            },
            [`& .MuiMobileStepper-dot:nth-of-type(-n + ${step})`]: {
              backgroundColor: '#FF7A3D',
            },
          }}
        />
        {children}
      </section>
    </main>
  );
}
