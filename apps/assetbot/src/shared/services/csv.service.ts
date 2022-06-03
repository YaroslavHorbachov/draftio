import { parseString } from '@fast-csv/parse';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CsvService {
  public parse(input: Buffer): Observable<string[][]> {
    const parse$ = new Observable<string[][]>((consumer) => {
      const strigifiedBufer = input.toString();
      const parseStream = parseString(strigifiedBufer);
      const rows: string[][] = [];

      parseStream.on('data', (data) => {
        rows.push(data);
      });

      parseStream.on('end', () => {
        consumer.next(rows.slice(1));
        consumer.complete();
      });
    });

    return parse$;
  }
}
