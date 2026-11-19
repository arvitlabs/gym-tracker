const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Client } = require('pg');
const { randomUUID } = require('node:crypto');
require('dotenv').config({ path: 'backend/.env', quiet: true });

// Run only against a separately created test database; never fall back to DATABASE_URL.
const url = process.env.TEST_DATABASE_URL;
test('database enforces one active plan and rolls back invalid day swaps', async () => {
  assert.ok(url, 'Set TEST_DATABASE_URL to a dedicated test database');
  const target = new URL(url);
  const dev = new URL(process.env.DATABASE_URL);
  assert.notEqual(
    target.pathname,
    dev.pathname,
    'Test and development database names must differ',
  );
  assert.match(
    target.pathname,
    /^\/gymtracker_test_[a-z0-9]+$/,
    'Use a disposable gymtracker_test_* database',
  );
  const db = new Client({ connectionString: url });
  await db.connect();
  try {
    await db.query('BEGIN');
    const [user, template, plan, day1, day2] = Array.from({ length: 5 }, () =>
      randomUUID(),
    );
    await db.query(
      'INSERT INTO "User" (id, phone, name, "securityStamp", "passwordHash") VALUES ($1,$2,$3,$4,$5)',
      [user, randomUUID().slice(0, 16), 'Test', randomUUID(), 'unused'],
    );
    await db.query(
      'INSERT INTO "PlanTemplate" (id, key, version, experience, location, "trainingDays") VALUES ($1,$2,1,\'BEGINNER\',\'GYM\',4)',
      [template, randomUUID()],
    );
    await db.query(
      'INSERT INTO "Plan" (id,"userId","templateId") VALUES ($1,$2,$3)',
      [plan, user, template],
    );
    await db.query('SAVEPOINT second_plan');
    await assert.rejects(
      db.query(
        'INSERT INTO "Plan" (id,"userId","templateId") VALUES ($1,$2,$3)',
        [randomUUID(), user, template],
      ),
      { code: '23505' },
    );
    await db.query('ROLLBACK TO SAVEPOINT second_plan');
    await db.query(
      "INSERT INTO \"PlanDay\" (id,\"planId\",position,focus,weekday) VALUES ($1,$3,1,'A','MONDAY'),($2,$3,2,'B','TUESDAY')",
      [day1, day2, plan],
    );
    const workout = randomUUID();
    await db.query(
      `INSERT INTO "Workout" (id,"userId","planId","sourceDayId","startedAt","endedAt","durationSeconds","timeZone","payloadHash") VALUES ($1,$2,$3,$4,now(),now(),0,'UTC','test')`,
      [workout, user, plan, day1],
    );
    await db.query('SAVEPOINT history');
    await assert.rejects(
      db.query('DELETE FROM "PlanDay" WHERE id=$1', [day1]),
      (error) => ['23503', '23001'].includes(error.code),
    );
    await db.query('ROLLBACK TO SAVEPOINT history');
    await db.query('SAVEPOINT swap');
    await assert.rejects(
      db.query('UPDATE "PlanDay" SET weekday=\'TUESDAY\' WHERE id=$1', [day1]),
      { code: '23505' },
    );
    await db.query('ROLLBACK TO SAVEPOINT swap');
    const result = await db.query(
      'SELECT weekday FROM "PlanDay" WHERE "planId"=$1 ORDER BY position',
      [plan],
    );
    assert.deepEqual(
      result.rows.map((r) => r.weekday),
      ['MONDAY', 'TUESDAY'],
    );
  } finally {
    await db.query('ROLLBACK');
    await db.end();
  }
});
