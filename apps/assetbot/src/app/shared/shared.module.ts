import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BotService, DocumentsService } from './services';
import { ChartsService } from './services/charts.service';
import { CsvService } from './services/csv.service';

const services = [BotService, DocumentsService, CsvService, ChartsService];

@Module({
  imports: [HttpModule],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
