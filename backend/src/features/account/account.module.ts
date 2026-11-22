import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { DevAccountController } from './dev-account.controller';
import { DevAccountService } from './dev-account.service';
import { AccountRepository } from './persistence/account.repository';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }]),
  ],
  controllers: [DevAccountController],
  providers: [DevAccountService, AccountRepository],
})
export class AccountModule {}
