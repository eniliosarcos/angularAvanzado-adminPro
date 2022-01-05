import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data:{title: 'Dashboard'}
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data:{title: 'progress'}
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data:{title: 'grafica #1'}
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data:{title: 'ajuste de cuenta'}
      },
      {
        path: 'promise',
        component: PromiseComponent,
        data:{title: 'Promesa'}
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data:{title: 'Rxjs'}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
