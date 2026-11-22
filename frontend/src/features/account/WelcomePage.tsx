import { Link } from 'react-router';

export default function WelcomePage() {
  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#131411] px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))] text-[#F3F1EA] sm:px-8">
      <svg
        className="pointer-events-none absolute -right-[9.5rem] top-[4.5rem] h-[26.25rem] w-[26.25rem] max-w-none sm:-right-[8rem]"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="210" cy="210" r="200" stroke="#2E2F2A" strokeWidth="2" />
        <circle cx="210" cy="210" r="150" stroke="#2E2F2A" strokeWidth="2" />
        <path
          d="M210 10 A200 200 0 0 1 404 160"
          stroke="#FF7A3D"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M210 60 A150 150 0 0 1 345 145"
          stroke="#FF7A3D"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <header className="relative flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#FF7A3D] text-[#1A0E06]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 12h3M18 12h3M6 8v8M18 8v8M9 10v4M15 10v4M9 12h6" />
          </svg>
        </span>
        <span className="font-display text-brand uppercase">Gym Tracker</span>
      </header>

      <section
        aria-labelledby="welcome-title"
        className="relative mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-end gap-7 pb-3 sm:pb-8"
      >
        <div className="flex flex-col gap-4">
          <h1
            id="welcome-title"
            className="font-display text-display uppercase"
          >
            Show up.
            <br />
            We plan
            <br />
            the rest.
          </h1>
          <p className="max-w-[330px] text-body text-[#A3A197]">
            A ready 5-day plan for home or gym — open the app, tap start, log
            your sets.
          </p>
        </div>

        <nav aria-label="Account access" className="flex flex-col gap-2.5">
          <Link
            to="/sign-up"
            className="flex min-h-[54px] items-center justify-center rounded-2xl bg-[#FF7A3D] px-5 text-body font-semibold text-[#1A0E06] transition-colors hover:bg-[#ff8c59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8F25A]"
          >
            Get started
          </Link>
          <Link
            to="/log-in"
            className="flex min-h-[54px] items-center justify-center rounded-2xl border-[1.5px] border-[#3A3B35] px-5 text-body font-semibold text-[#F3F1EA] transition-colors hover:border-[#A3A197] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8F25A]"
          >
            I already have an account
          </Link>
        </nav>
      </section>
    </main>
  );
}
