import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ChartsModule } from './charts/charts.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [BotModule, DocumentsModule, ChartsModule],
})
export class AppModule {}
