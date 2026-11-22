import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from './infrastructure/database/database.module';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async check() {
    try {
      await this.db.ping();
      return { status: 'ok', database: 'connected' };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'unavailable',
      });
    }
  }
}
