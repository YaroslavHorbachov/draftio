import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ChartsController } from './charts.controller';

@Module({
  controllers: [ChartsController],
  imports: [SharedModule],
})
export class ChartsModule {}
