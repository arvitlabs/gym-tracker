import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './persistence/account.repository';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
