import { NgModule } from '@angular/core';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { RegisterLayoutComponent } from './register-layout/register-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    AuthLayoutRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
