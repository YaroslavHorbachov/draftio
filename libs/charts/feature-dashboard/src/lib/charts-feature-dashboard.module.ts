import { NgModule } from '@angular/core';
import { ChartModule } from '@draftio/shared-ui-components';
import { ChartsFeatureDashboardRoutingModule } from './charts-feature-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [ChartsFeatureDashboardRoutingModule, ChartModule],
  declarations: [DashboardComponent],
})
export class ChartsFeatureDashboardModule {
  constructor() {
    console.log('Loaded Dashboard');
  }
}
