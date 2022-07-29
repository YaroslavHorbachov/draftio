import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedAuthClientModule } from '@draftio/shared/auth-client';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedAuthClientModule.forRoot(environment.firebase)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
