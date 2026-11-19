// Public browser configuration. Never put credentials in VITE_ variables.
// A relative /api path allows the same build to use each host's API proxy.
export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(
  /\/+$/,
  '',
);
