import { Injectable } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { combineLatest, forkJoin, map, Observable, shareReplay } from 'rxjs';
import { BACKGROUND_COLORS, POINTER_BACKGROUND_COLORS } from '../constants';
import { CutAssetModel } from '../models';
import { CutsAssetsService } from './cuts-assets.service';

@Injectable({
  providedIn: 'root',
})
export class CutsService {
  constructor(private readonly cutsAssetsService: CutsAssetsService) {}

  private readonly allNamesSource$ = this.cutsAssetsService.allNames$.pipe(shareReplay(1));

  public readonly allNamesLabels$ = this.allNamesSource$.pipe(map((source) => source.labels));

  public readonly allNamesDatasets$ = this.allNamesSource$.pipe(
    map((source) => {
      return [{ data: source.data, label: 'All Names' }] as ChartDataset[];
    })
  );

  private readonly data$ = this.createData().pipe(shareReplay(1));

  private readonly colorGroup$ = this.data$.pipe(map((data) => this.createGroup(data, 'color')));

  private readonly cardTypeGroup$ = this.data$.pipe(map((data) => this.createGroup(data, 'cardType')));

  public readonly cardTypeLabels$ = this.cardTypeGroup$.pipe(map((data) => Object.keys(data)));

  public readonly cardTypeDatasets$ = this.cardTypeGroup$.pipe(
    map((data) => {
      return [
        {
          data: Object.values(data),
          label: 'Card Type',
        },
      ] as ChartDataset[];
    })
  );

  public readonly colorLabels$ = this.colorGroup$.pipe(map((colorGroup) => Object.keys(colorGroup)));

  private readonly colorBackgroundColors$ = this.colorLabels$.pipe(
    map((colorLabels) => {
      return colorLabels.map((colorLabel) => {
        return this.getBackgroundColor(colorLabel);
      });
    })
  );

  private readonly colorPointerBackgroundColors$ = this.colorLabels$.pipe(
    map((colorLabels) => {
      return colorLabels.map((colorLabel) => {
        return this.getPointerBackgroundColor(colorLabel);
      });
    })
  );

  public readonly colorDataset$ = combineLatest([
    this.colorGroup$,
    this.colorBackgroundColors$,
    this.colorPointerBackgroundColors$,
  ]).pipe(
    map(([colorGroup, backgroundColors, pointerBackgroundColors]) => {
      return [
        {
          data: Object.values(colorGroup),
          label: 'Colors',
          backgroundColor: backgroundColors,
          hoverBackgroundColor: pointerBackgroundColors,
        },
      ] as ChartDataset[];
    })
  );

  private createGroup(data: CutAssetModel[], field: keyof CutAssetModel): Record<string, number> {
    return data.reduce((baseGroup, dataItem) => {
      let groupKey = dataItem[field];

      if (field === 'color') {
        groupKey = this.normalizeColor(groupKey);
      }

      if (field === 'cardType') {
        groupKey = this.normalizeCardType(groupKey);
      }

      const groupValue = baseGroup[groupKey] ?? 0;

      return { ...baseGroup, [groupKey]: groupValue + 1 };
    }, {} as Record<string, number>);
  }

  private createData(): Observable<CutAssetModel[]> {
    const assets = this.filenames.map((filename) => {
      return this.cutsAssetsService.loadAsset(filename);
    });

    return forkJoin(assets).pipe(
      map((assetModels) => {
        return assetModels.reduce((baseModels, models) => [...baseModels, ...models], []);
      })
    );
  }

  private normalizeColor(color: string): string {
    if (color.length === 0) {
      return 'Colorless';
    }

    const colorSegments = color.split('/');

    return colorSegments.length > 1 ? 'Multicolor' : color;
  }

  private normalizeCardType(cardType: string): string {
    const reservedCardTypes = ['Creature', 'Aura', 'Artifact'];

    const matchedCardTypeIndex = reservedCardTypes.findIndex((type) => {
      return cardType.includes(type);
    });

    return reservedCardTypes[matchedCardTypeIndex] ?? cardType;
  }

  private getBackgroundColor(color: string): string | void {
    return BACKGROUND_COLORS.get(color);
  }

  private getPointerBackgroundColor(color: string): string | void {
    return POINTER_BACKGROUND_COLORS.get(color);
  }

  // TODO: Refactor to node js

  private get filenames(): string[] {
    return [
      'May6Draw_2022_May_15_16-14.csv',
      'May8Draw_2022_May_15_16-14.csv',
      'May10Draw_2022_May_15_16-13.csv',
      'May11Draw_2022_May_15_16-14.csv',
      'May13Draw_2022_May_15_16-14.csv',
      'May14Draw_2022_May_15_16-14.csv',
    ];
  }
}
