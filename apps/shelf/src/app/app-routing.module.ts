import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGatewayComponent } from '@draftio/shared/auth-client';

const routes: Routes = [
  {
    path: '',
    component: AuthGatewayComponent,
    children: [
      {
        path: '',
        loadChildren: async () => {
          const module = await import('@draftio/shelf/feature-dashboard');

          return module.ShelfFeatureDashboardModule;
        },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
