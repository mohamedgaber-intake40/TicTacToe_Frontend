import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Auth/login/login.component';
import { RegisterComponent } from '../Auth/register/register.component';
import { AuthGuard } from '../Auth/services/auth.guard';
import { RedirectGuard } from '../Auth/services/redirect.guard';
import { OnlineComponent } from '../online/online.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectGuard]
  },
  {
    path: 'online',
    component: OnlineComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }
