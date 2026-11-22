import { useCallback, useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';

export default function HealthCheckPage() {
  const [status, setStatus] = useState('Checking connection…');
  const check = useCallback(async () => {
    setStatus('Checking connection…');
    try {
      const response = await fetch(`${apiBaseUrl}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error('Connection failed');
      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== 'object' ||
        !('database' in result) ||
        result.database !== 'connected'
      ) {
        throw new Error('Unexpected response');
      }
      setStatus('API and database connected');
    } catch {
      setStatus('Connection unavailable');
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  return (
    <main className="min-h-dvh bg-[#f4f6f1] px-6 pt-[20vh] text-[#14251e]">
      <p className="text-label">GYM TRACKER</p>
      <h1 className="mt-4 text-title font-semibold">Connection check</h1>
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
