import { Link } from 'react-router';

export default function FormMessage({
  message,
  showSignUp = false,
}: {
  message: string;
  showSignUp?: boolean;
}) {
  if (!message) return null;
  return (
    <div role="alert" className="text-body text-[#FFB4A2]">
      {message}{' '}
      {showSignUp && (
        <Link className="underline" to="/sign-up">
          Sign up
        </Link>
      )}
    </div>
  );
}
