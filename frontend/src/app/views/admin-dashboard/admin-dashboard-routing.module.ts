import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { MangeUsersComponent } from './mange-users/mange-users.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: HomeDashComponent,
  },
  {
    path: 'users',
    component: MangeUsersComponent,
  },
  {
    path: 'posts',
    component: ManagePostsComponent,
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
