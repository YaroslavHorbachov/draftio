import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cuts',
    loadChildren: async () => {
      const module = await import('@draftio/charts-feature-cuts');

      return module.ChartsFeatureCutsModule;
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsFeatureDashboardRoutingModule {}
