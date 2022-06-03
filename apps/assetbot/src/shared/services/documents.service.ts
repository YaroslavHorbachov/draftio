import { DocumentRowModel } from '@draftio/shared-models';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { access, mkdir, readdir, readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { catchError, forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { CsvService } from './csv.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly httpService: HttpService, private readonly csvService: CsvService) {}

  private readonly assetsDirectoryPath = path.join(__dirname, 'assets', 'uploads');

  public get all$(): Observable<DocumentRowModel[]> {
    const directoryFiles$ = from(readdir(this.assetsDirectoryPath));

    return directoryFiles$.pipe(
      switchMap((directoryFiles) => {
        const documentsBuffers = directoryFiles.map((directoryFile) => {
          const documentPath = path.join(this.assetsDirectoryPath, directoryFile);

          return readFile(documentPath);
        });

        return Promise.all(documentsBuffers);
      }),
      switchMap((documentsBuffers) => {
        const rawDocuments = documentsBuffers.map((fileBuffer) => this.csvService.parse(fileBuffer));

        return forkJoin(rawDocuments);
      }),
      map((parsedDocuments) => {
        return parsedDocuments.flatMap((document) => {
          return document.map((row) => new DocumentRowModel(row));
        });
      })
    );
  }

  public save(filename: string, fileUrl: string): Observable<void> {
    return this.createDirectory(this.assetsDirectoryPath).pipe(
      switchMap(() => {
        const file$ = this.httpService.get(fileUrl, {
          responseType: 'blob',
        });

        return file$.pipe(
          switchMap((response) => {
            const filePath = path.join(this.assetsDirectoryPath, filename);

            return writeFile(filePath, response.data);
          })
        );
      })
    );
  }

  private createDirectory(directoryPath: string) {
    return from(access(directoryPath)).pipe(
      catchError(() => {
        return from(mkdir(directoryPath, { recursive: true }));
      })
    );
  }
}
