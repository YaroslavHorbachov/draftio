import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { BotController } from './bot.controller';

@Module({
  controllers: [BotController],
  imports: [SharedModule],
})
export class BotModule {}
