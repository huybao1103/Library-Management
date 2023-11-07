import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { ResetPasswordComponent } from './login-register/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './login-register/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/feature.module').then(m => m.FeatureModule)
  },
  {
    path: 'reader',
    redirectTo: 'reader',
    pathMatch: 'full'
  },
  {
    path: 'reader',
    loadChildren: () => import('./reader-modules/reader-module.module').then(m => m.ReaderModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password/:accountId/:email',
    component: ResetPasswordComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
