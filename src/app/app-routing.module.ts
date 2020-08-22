import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { UserComponent } from './user/user.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'test', component: HeaderComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'blogs/add', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'user/detail', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'blogs/:id', component: ViewBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
