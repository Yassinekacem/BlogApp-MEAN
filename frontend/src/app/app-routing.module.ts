import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './layouts/main-auth/main-auth.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { CreatePostComponent } from './views/post/create-post/create-post.component';
import { AuthGuard } from './guards/auth.guard';

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
  children: [
    {
      path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import("./views/home-connected/home-connected.module").then(m => m.HomeConnectedModule)
    },
    {
      path: 'profil',
      canActivate: [AuthGuard],
      loadChildren: () => import("./views/profil/profil.module").then(m => m.ProfilModule)
    },
    {
      path: 'post', 
      loadChildren: () => import("./views/post/post.module").then(m => m.PostModule)
    },
    
    ]
 }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
