import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './layouts/main-auth/main-auth.component';
import { RegisterLayoutComponent } from './views/auth-layout/register-layout/register-layout.component';
import { H } from '@angular/cdk/keycodes';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component:MainAuthComponent ,
    //canActivateChild: [BypassGuard],
    loadChildren: () => import("./views/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
  },
 {
  path: '',
  component: HomeLayoutComponent,
 }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
