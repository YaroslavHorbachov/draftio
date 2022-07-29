import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirebaseOptions } from 'firebase/app';
import { AuthGatewayComponent } from './components/gateway/auth-gateway.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireModule, ReactiveFormsModule],
  declarations: [AuthGatewayComponent, LoginComponent, RegisterComponent],
  exports: [AuthGatewayComponent],
})
export class SharedAuthClientModule {
  public static forRoot(firebaseOptions: FirebaseOptions): ModuleWithProviders<SharedAuthClientModule> {
    return {
      ngModule: SharedAuthClientModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: firebaseOptions,
        },
      ],
    };
  }
}
