import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter,map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit,OnDestroy {

  title: string;
  subscripcion: Subscription

  constructor(private router: Router) {
    this.getDataRoutes();
  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  getDataRoutes(){

    this.subscripcion = this.router.events.pipe(

      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild ===null),
      map((x:ActivationEnd) => x.snapshot.data)

    ).subscribe(({title}) => {
      this.title = title
      document.title = `AdminPro - ${this.title}`
    })

    return this.subscripcion;
  }

  ngOnInit(): void {
  }

}
