import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevAccountService } from './features/account/dev-account.service';
import { DevAccountController } from './features/account/dev-account.controller';
import { HealthController } from './health.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HealthController, DevAccountController],
  providers: [DevAccountService],
})
export class AppModule {}
