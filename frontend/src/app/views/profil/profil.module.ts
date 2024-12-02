import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ViewProfilComponent } from './view-profil/view-profil.component';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    EditProfilComponent,
    ViewProfilComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MaterialModule

  ]
})
export class ProfilModule { }
