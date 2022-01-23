import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: '/'},
        {title: 'Graficas', url: 'grafica1'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Promesas', url: 'promise'},
        {title: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Usuarios', url: 'usuarios'},
        {title: 'Hospitales', url: 'hospitales'},
        {title: 'Medicos', url: 'medicos'},

      ]
    }
  ];

  constructor() { }
}
