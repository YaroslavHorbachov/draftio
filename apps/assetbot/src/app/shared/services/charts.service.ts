import { ChartModel, ColorNormalizer, ColorUtils, DocumentRowModel } from '@draftio/shared/common';
import { Injectable } from '@nestjs/common';
import { AllColors, CommonColors } from 'libs/shared/common/src/lib/enums/colors.enum';
import { map, Observable } from 'rxjs';
import { DocumentsService } from './documents.service';

@Injectable()
export class ChartsService {
  constructor(private readonly documentsService: DocumentsService) {}

  private readonly colorsResource$ = this.documentsService.flatAll$.pipe(
    map((all) => {
      const normalizer = ColorUtils.normalizeColor(ColorUtils.multicolorNormalizer);

      return this.createTargetGroupByKey(all, 'color', normalizer);
    })
  );

  public get allNames$(): Observable<ChartModel> {
    return this.documentsService.flatAll$.pipe(
      map((all) => {
        const targetGroup = this.createTargetGroupByKey(all, 'name');

        return this.mapGroup(targetGroup);
      })
    );
  }

  public get allColors$(): Observable<ChartModel> {
    return this.colorsResource$.pipe(
      map((colorsResource) => {
        return this.mapGroup(colorsResource);
      })
    );
  }

  public get commonColors$(): Observable<ChartModel> {
    return this.colorsResource$.pipe(
      map((colorsResource) => {
        const entries = Object.entries(colorsResource).filter((entry) => {
          const [key] = entry;

          return ColorUtils.checkIsCommonColor(key as CommonColors);
        });

        const filteredGroup = Object.fromEntries(entries);

        return this.mapGroup(filteredGroup);
      })
    );
  }

  public get analysisAllNames$(): Observable<ChartModel> {
    return this.documentsService.rawAll$.pipe(
      map((all) => {
        // Todo: Add pipeline for find names
        return this.createTargetAnalysysGroup(all);
      })
    );
  }

  public getRarity() {
    //
  }

  public getTypes() {
    //
  }

  private createTargetAnalysysGroup(rawAll: DocumentRowModel[][]): ChartModel {
    // TODO: Add check only for monocolors
    const calculatePopularColors = (data: Record<AllColors, number>) => {
      const entries = Object.entries(data);
      const indexedValues = entries.map(([, value], index) => [index, value]);

      indexedValues.sort((first, second) => {
        const [firstValue, secondValue] = [first[1], second[1]];

        return firstValue > secondValue ? 1 : -1;
      });

      // TOOD: Add constant for POPULAR COLORS Count
      const popularColorsRange = indexedValues.slice(0, 3);
      const popularColorKeys = popularColorsRange.reduce((base, [index]) => {
        const key = entries[index][0];

        return { ...base, [key]: data[key] };
      }, {} as Record<AllColors, number>);

      return popularColorKeys;
    };

    const aggregateCardsByColors = (rows: DocumentRowModel[], popularColors: Record<AllColors, number>) => {
      const normalizer = ColorUtils.normalizeColor(ColorUtils.segmentsMulticolorNormalizer);
      const targetColors = Object.keys(popularColors) as AllColors[];
      const matchedRows = rows.filter((row) => {
        const normalizerRowColors = normalizer(row.color);

        return targetColors.some((targetColor) => normalizerRowColors.includes(targetColor));
      });

      return matchedRows;
    };

    const rowsCards = rawAll.flatMap((rows) => {
      const normalizer = ColorUtils.normalizeColor(ColorUtils.segmentsMulticolorNormalizer);

      const colorGroup = this.createTargetGroupByKey(rows, 'color', normalizer);
      const popularColors = calculatePopularColors(colorGroup);
      const aggregatedCards = aggregateCardsByColors(rows, popularColors);

      return aggregatedCards;
    });

    const targetGroupByName = this.createTargetGroupByKey(rowsCards, 'name');

    return this.mapGroup(targetGroupByName);
  }

  private mapGroup(group: Record<string, number>): ChartModel {
    const entries = Object.entries(group);
    const model = entries.reduce((baseModel, entry) => {
      const [key, value] = entry;
      const baseLabels = baseModel.labels ?? [];
      const baseData = baseModel.data ?? [];

      return { labels: [...baseLabels, key], data: [...baseData, value] };
    }, {} as ChartModel);

    return model;
  }

  private createTargetGroupByKey(
    all: DocumentRowModel[],
    key: keyof DocumentRowModel,
    normalizer?: ColorNormalizer
  ): Record<string, number> {
    const targetGroup = all.reduce((baseTargetGroup, model) => {
      const keyValue = model[key];
      const normalizedKeys = normalizer ? normalizer(keyValue) : [keyValue];
      const patchedBase = normalizedKeys.reduce((base, normalizedKey) => {
        const value = base[normalizedKey] ?? 0;

        return { ...base, [normalizedKey]: value + 1 };
      }, baseTargetGroup);

      return patchedBase;
    }, {} as Record<string, number>);

    return targetGroup;
  }
}
