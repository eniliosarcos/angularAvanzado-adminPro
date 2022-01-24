import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicComponent } from './maintenance/medic/medic.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'progress' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'grafica #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'ajuste de cuenta' },
      },
      {
        path: 'promise',
        component: PromiseComponent,
        data: { title: 'Promesa' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'Rxjs' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Perfil' },
      },

      // maintenance
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Mantenimiento de usuarios' },
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Mantenimiento de hospitales' },
      },
      {
        path: 'medics',
        component: MedicsComponent,
        data: { title: 'Mantenimiento de medicos' },
      },
      {
        path: 'medic/:id',
        component: MedicComponent,
        data: { title: 'Mantenimiento del medico' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
