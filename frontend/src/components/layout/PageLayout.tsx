import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router';

type Props = { title: string; backTo?: string };

export default function PageLayout({ title, backTo }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-[#3A3B35] bg-[#131411] px-4 pt-[env(safe-area-inset-top)] text-[#F3F1EA]">
        <div className="mx-auto flex min-h-14 max-w-screen-lg items-center gap-3 py-1">
          {backTo && (
            <Link
              to={backTo}
              aria-label="Back"
              className="grid size-11 shrink-0 place-items-center rounded-xl focus-visible:outline-2 focus-visible:outline-[#C8F25A]"
            >
              <ArrowLeft aria-hidden="true" />
            </Link>
          )}
          <h1 className="font-display text-title">{title}</h1>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
