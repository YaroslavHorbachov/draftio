import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartModel } from '@draftio/shared/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssetbotApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public get allNames$(): Observable<ChartModel> {
    return this.httpClient.get<ChartModel>('/assetbot/charts/all-names');
  }

  public get allColors$(): Observable<ChartModel> {
    return this.httpClient.get<ChartModel>('/assetbot/charts/all-colors');
  }

  public get commonColors$(): Observable<ChartModel> {
    return this.httpClient.get<ChartModel>('/assetbot/charts/common-colors');
  }

  public get analisysAllNames$(): Observable<ChartModel> {
    return this.httpClient.get<ChartModel>('/assetbot/charts/analysis-all-names');
  }
}
