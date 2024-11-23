import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainAuthComponent } from './layouts/main-auth/main-auth.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { UpHeaderComponent } from './layouts/home-layout/up-header/up-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAuthComponent,
    HomeLayoutComponent,
    UpHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
