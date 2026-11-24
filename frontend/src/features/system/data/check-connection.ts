import { apiBaseUrl } from '@/config';

export async function checkConnection() {
  const response = await fetch(`${apiBaseUrl}/health`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error('Connection failed');
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== 'object' ||
    !('success' in result) ||
    result.success !== true ||
    !('data' in result) ||
    !result.data ||
    typeof result.data !== 'object' ||
    !('database' in result.data) ||
    result.data.database !== 'connected'
  ) {
    throw new Error('Unexpected response');
  }
}
