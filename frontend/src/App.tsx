import { useCallback, useEffect, useState } from 'react';
import { apiBaseUrl } from './config';

export default function App() {
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
      )
        throw new Error('Unexpected response');
      setStatus('API and database connected');
    } catch {
      setStatus('Connection unavailable');
    }
  }, []);
  useEffect(() => {
    void check();
  }, [check]);
  return (
    <main className="mx-auto max-w-2xl px-6 pt-[20vh] text-[#14251e]">
      <p className="text-xs font-bold tracking-[0.14em]">GYM TRACKER</p>
      <h1 className="mt-4 text-5xl leading-tight font-semibold">
        Build your consistency.
      </h1>
      <p className="mt-4 leading-relaxed">
        Your training space is taking shape.
      </p>
      <div className="mt-12 text-sm text-[#526259]">
        <p role="status">{status}</p>
        <button className="mt-2 underline" onClick={() => void check()}>
          Check again
        </button>
      </div>
    </main>
  );
}
