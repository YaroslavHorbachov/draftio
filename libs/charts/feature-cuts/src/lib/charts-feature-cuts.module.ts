import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from '@draftio/shared-components';
import { ChartsComponent } from './components';

const routes: Routes = [{ path: '', component: ChartsComponent }];

@NgModule({
  declarations: [ChartsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ChartModule],
})
export class ChartsFeatureCutsModule {
  constructor() {
    console.log('Loaded Cuts');
  }
}
