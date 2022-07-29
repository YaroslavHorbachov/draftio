import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [ChartComponent],
})
export class ChartModule {
  constructor() {
    console.log('Chart Module Loaded');

    Chart.register(...registerables);
  }
}
