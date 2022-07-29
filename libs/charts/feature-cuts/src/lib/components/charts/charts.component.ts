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

  public readonly allNamesLabels$ = this.cutsService.allNamesLabels$;
  public readonly allNamesDatasets$ = this.cutsService.allNamesDatasets$;

  public readonly allColorsLabels$ = this.cutsService.allColorsLabels$;
  public readonly allColorsDatasets$ = this.cutsService.allColorsDatasets$;

  public readonly commonColorsLabels$ = this.cutsService.commonColorsLabels$;
  public readonly commonColorsDatasets$ = this.cutsService.commonColorsDatasets$;

  public readonly analysisAllNamesLabels$ = this.cutsService.analysisAllNamesLabels$;
  public readonly analysisAllNamesDatasets$ = this.cutsService.analysisAllNamesDatasets$;
}
