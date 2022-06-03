import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartModel } from '@draftio/shared-models';
import { Observable, of } from 'rxjs';
import { CutAssetModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CutsAssetsService {
  constructor(private readonly httpClient: HttpClient) {}

  public loadAsset(filename: string): Observable<CutAssetModel[]> {
    // return this.httpClient
    //   .get(`assets/csv/cuts/${filename}`, { responseType: "text" })
    //   .pipe(map((response) => this.handleAssetResponse(response)));

    return of([]);
  }

  public get allNames$(): Observable<ChartModel> {
    return this.httpClient.get<ChartModel>('/assetbot/charts/names');
  }

  private handleAssetResponse(response: string): CutAssetModel[] {
    const [, ...rows] = response.split('\n');
    const targetRows = rows.filter(Boolean);

    return targetRows.map((row) => new CutAssetModel(row));
  }
}
