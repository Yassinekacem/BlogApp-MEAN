import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainAuthComponent } from './layouts/main-auth/main-auth.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { UpHeaderComponent } from './layouts/home-layout/up-header/up-header.component';
import { FooterComponent } from './layouts/home-layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { DeleteModelComponent } from './layouts/delete-model/delete-model.component';
import { DashboardComponent } from './layouts/admin-dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAuthComponent,
    HomeLayoutComponent,
    UpHeaderComponent,
    FooterComponent,
    DeleteModelComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
