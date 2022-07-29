import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  imports: [SharedModule],
})
export class DocumentsModule {}
