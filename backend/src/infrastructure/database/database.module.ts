import { Injectable, Module, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 3000,
      }),
    });
  }
  async ping() {
    if (!process.env.DATABASE_URL)
      throw new Error('Database configuration missing');
    await this.$queryRaw`SELECT 1`;
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
@Module({ providers: [DatabaseService], exports: [DatabaseService] })
export class DatabaseModule {}
