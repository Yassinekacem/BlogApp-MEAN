import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfilComponent } from './view-profil/view-profil.component';

const routes: Routes = [

  {
    path: '',
    component: ViewProfilComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
