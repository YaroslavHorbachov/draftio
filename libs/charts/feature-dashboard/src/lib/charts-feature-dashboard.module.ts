import { NgModule } from '@angular/core';
import { ChartModule } from '@draftio/shared-components';
import { ChartsFeatureDashboardRoutingModule } from './charts-feature-dashboard-routing.module';

@NgModule({
  imports: [ChartsFeatureDashboardRoutingModule, ChartModule],
})
export class ChartsFeatureDashboardModule {
  constructor() {
    console.log('Loaded Dashboard');
  }
}
