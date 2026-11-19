import {
  Controller,
  Get,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Pool } from 'pg';

@Controller('health')
export class HealthController implements OnModuleDestroy {
  private readonly pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 3000,
  });

  @Get()
  async check() {
    try {
      if (!process.env.DATABASE_URL)
        throw new Error('Database configuration missing');
      await this.pool.query('SELECT 1');
      return { status: 'ok', database: 'connected' };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'unavailable',
      });
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
