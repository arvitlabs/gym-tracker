const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');

test('API returns unavailable when PostgreSQL cannot be reached', async () => {
  const listener = net.createServer();
  await new Promise((resolve) => listener.listen(0, '127.0.0.1', resolve));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  const api = spawn(process.execPath, ['dist/main.js'], {
    cwd: 'backend',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      PORT: String(port),
      DATABASE_URL:
        'postgresql://test:test@127.0.0.1:1/unavailable?connect_timeout=1',
    },
    stdio: 'ignore',
  });
  try {
    let response;
    for (let i = 0; i < 50; i++) {
      try {
        response = await fetch(`http://127.0.0.1:${port}/api/health`);
        break;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    assert.ok(response, 'API did not start');
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      success: false,
      data: null,
      error: { code: 'SERVICE_UNAVAILABLE', message: 'Request failed.' },
    });
  } finally {
    api.kill();
    await new Promise((resolve) => api.once('exit', resolve));
  }
});
