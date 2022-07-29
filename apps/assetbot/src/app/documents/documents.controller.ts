import { DocumentRowModel } from '@draftio/shared/common';
import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentsService } from '../shared/services';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  public getAll(): Observable<DocumentRowModel[]> {
    return this.documentsService.flatAll$;
  }
}
