import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfilComponent } from './view-profil/view-profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';

const routes: Routes = [

  {
    path: 'view/:id',
    component: ViewProfilComponent
  },
  {
    path: 'edit',
    component: EditProfilComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
