import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterLayoutComponent } from './register-layout/register-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component : LoginLayoutComponent },
  { path : 'register', component : RegisterLayoutComponent },
  //{ path : 'forgot-password', component : ForgotPassComponent },
  //{ path : 'reset-password', component : ResetPassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
