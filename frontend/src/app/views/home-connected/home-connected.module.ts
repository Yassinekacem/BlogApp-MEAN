import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeConnectedRoutingModule } from './home-connected-routing.module';
import { CoverComponent } from './cover/cover.component';
import { PostComponent } from './posts/post.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    CoverComponent,
    PostComponent,
    HomePageComponent,
    AboutComponent,
    ContactComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    HomeConnectedRoutingModule,
    MaterialModule
  ]
})
export class HomeConnectedModule { }
