import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { MangeUsersComponent } from './mange-users/mange-users.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';




@NgModule({
  declarations: [
    HomeDashComponent,
    MangeUsersComponent,
    ManagePostsComponent,
    EditUserComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReactiveFormsModule,
    ChartModule
  ]
})
export class AdminDashboardModule { }
