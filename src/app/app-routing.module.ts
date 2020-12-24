import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { AdminComponent } from './layout/admin/admin.component';
import {AuthGuard} from './guard/auth.guard';
import {PasswordResetComponent} from "./layout/password-reset/password-reset.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
