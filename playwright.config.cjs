const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './frontend/tests',
  use: { baseURL: 'http://127.0.0.1:4174', browserName: 'chromium' },
  webServer: [
    {
      command: 'npm run start --workspace @gym-tracker/backend',
      url: 'http://127.0.0.1:3101/api/health',
      reuseExistingServer: false,
      env: { PORT: '3101' },
    },
    {
      command: 'npm run dev --workspace @gym-tracker/frontend -- --port 4174',
      url: 'http://127.0.0.1:4174',
      reuseExistingServer: false,
      env: { VITE_TEST_API_PORT: '3101' },
    },
  ],
});
