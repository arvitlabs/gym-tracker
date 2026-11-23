const refreshTokenLifetimeMs = 30 * 24 * 60 * 60 * 1000;

export function refreshTokenExpiry() {
  return new Date(Date.now() + refreshTokenLifetimeMs);
}
