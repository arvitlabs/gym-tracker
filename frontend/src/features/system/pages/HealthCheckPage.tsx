import { useCallback, useEffect, useState } from 'react';
import { checkConnection } from '../data/check-connection';

export default function HealthCheckPage() {
  const [status, setStatus] = useState('Checking connection…');
  const check = useCallback(async () => {
    setStatus('Checking connection…');
    try {
      await checkConnection();
      setStatus('API and database connected');
    } catch {
      setStatus('Connection unavailable');
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  return (
    <main className="flex-1 bg-[#f4f6f1] px-6 pt-[20vh] text-[#14251e]">
      <div className="mt-12 text-[#526259]">
        <p className="text-body" role="status">
          {status}
        </p>
        <button
          className="mt-2 rounded-sm text-label underline focus-visible:outline-2 focus-visible:outline-offset-4"
          onClick={() => void check()}
        >
          Check again
        </button>
      </div>
    </main>
  );
}
