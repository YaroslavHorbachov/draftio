import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'draftio-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  @Input() public type: ChartType = 'bar';

  @Input() public labels: string[] | null = null;

  @Input() public data: ChartDataset[] | null = null;
}
