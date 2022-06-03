import { ChartModel, DocumentRowModel } from '@draftio/shared-models';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DocumentsService } from './documents.service';

@Injectable()
export class ChartsService {
  constructor(private readonly documentsService: DocumentsService) {}

  public getAllNames(): Observable<ChartModel> {
    return this.documentsService.all$.pipe(
      map((all) => {
        const targetGroup = this.createTargetGroupByKey(all, 'name');
        const model = this.mapGroup(targetGroup);

        return model;
      })
    );
  }

  public getRarity() {
    //
  }

  public getTypes() {
    //
  }

  private createTargetGroupByKey(all: DocumentRowModel[], key: keyof DocumentRowModel): Record<string, number> {
    const targetGroup = all.reduce((baseTargetGroup, model) => {
      const modelValue = model[key];
      const currentValue = baseTargetGroup[modelValue] ?? 0;

      return { ...baseTargetGroup, [modelValue]: currentValue + 1 };
    }, {} as Record<string, number>);

    return Object.fromEntries(Object.entries(targetGroup).filter((entry) => entry[1] > 1));
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
}
