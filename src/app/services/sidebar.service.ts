import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    // if(this.menu.length === 0){

    // }
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {title: 'Main', url: '/'},
  //       {title: 'Graficas', url: 'grafica1'},
  //       {title: 'ProgressBar', url: 'progress'},
  //       {title: 'Promesas', url: 'promise'},
  //       {title: 'Rxjs', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {title: 'Usuarios', url: 'users'},
  //       {title: 'Hospitales', url: 'hospitals'},
  //       {title: 'Medicos', url: 'medics'},

  //     ]
  //   }
  // ];

  constructor() { }
}
