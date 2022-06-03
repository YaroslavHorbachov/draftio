import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CutsService } from '../../services';

@Component({
  selector: 'draftio-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  constructor(private readonly cutsService: CutsService) {}

  // public readonly colorDataset$ = this.cutsService.colorDataset$.pipe(tap(console.log));

  // public readonly colorLabels$ = this.cutsService.colorLabels$.pipe(tap(console.log));

  // public readonly cardTypeDataset$ = this.cutsService.cardTypeDatasets$.pipe(tap(console.log));

  // public readonly cardTypeLabels$ = this.cutsService.cardTypeLabels$.pipe(tap(console.log));

  public readonly allNamesLabels$ = this.cutsService.allNamesLabels$;
  public readonly allNamesDatasets$ = this.cutsService.allNamesDatasets$;
}
