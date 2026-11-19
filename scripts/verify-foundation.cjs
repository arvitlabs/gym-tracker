const { Client } = require('pg');
const { spawnSync } = require('node:child_process');
const { randomBytes } = require('node:crypto');
require('dotenv').config({ path: 'backend/.env', quiet: true });

async function main() {
  if (!process.env.DATABASE_URL)
    throw new Error('Set DATABASE_URL in backend/.env');
  const original = process.env.DATABASE_URL;
  const adminUrl = new URL(original);
  adminUrl.pathname = '/postgres';
  const name = `gymtracker_test_${randomBytes(8).toString('hex')}`;
  const testUrl = new URL(original);
  testUrl.pathname = `/${name}`;
  const admin = new Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  let created = false;
  const run = (command, args, opts = {}) => {
    const result = spawnSync(command, args, { stdio: 'inherit', ...opts });
    if (result.status !== 0) throw new Error(`${command} failed`);
  };
  try {
    await admin.query(`CREATE DATABASE "${name}"`);
    created = true;
    const env = {
      ...process.env,
      DATABASE_URL: testUrl.toString(),
      TEST_DATABASE_URL: testUrl.toString(),
    };
    run('../node_modules/.bin/prisma', ['migrate', 'deploy'], {
      cwd: 'backend',
      env,
    });
    run('node', ['--test', 'backend/test/database.test.cjs'], {
      env: { ...env, DATABASE_URL: original },
    });
    run('node_modules/.bin/playwright', ['test'], { env });
  } finally {
    if (created) await admin.query(`DROP DATABASE "${name}"`);
    await admin.end();
  }
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
