import { Link } from 'react-router';

type AccountEntryPageProps = Readonly<{
  title: 'Sign up' | 'Log in';
}>;

export default function AccountEntryPage({ title }: AccountEntryPageProps) {
  return (
    <main className="flex min-h-dvh flex-col bg-[#131411] px-5 py-8 text-[#F3F1EA] sm:px-8">
      <Link
        to="/"
        className="font-display text-brand w-fit rounded-sm uppercase text-[#A3A197] hover:text-[#F3F1EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8F25A]"
      >
        Gym Tracker
      </Link>
      <section className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center gap-4">
        <h1 className="font-display text-title uppercase">{title}</h1>
        <p className="text-body text-[#A3A197]">
          This screen is coming in the next account setup task.
        </p>
      </section>
    </main>
  );
}
