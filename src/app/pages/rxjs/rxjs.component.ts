import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = []
  constructor() {



    // this.returnObs().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   (err) => console.log('Error', err),
    //   () => console.log('obs terminado')
    // );

    this.subscription.push(this.returnInterval().subscribe(value => console.log(value)));
  }

  returnInterval(): Observable<number>{

    return interval(100).pipe(
      map(x => x+1),
      filter(x=> x % 2 === 0),
      // take(10),
    );

  }

  // returnObs(): Observable<number> {

  //   let i = 0;

  //   return new Observable<number>(observer =>{

  //     const interval = setInterval(()=>{
  //       i++;
  //       observer.next(i);

  //       if(i === 4){
  //         clearInterval(interval);
  //         observer.complete();
  //       }

  //       if(i === 2){
  //         observer.error('llego al error 2');
  //       }

  //     },1000);

  //   });
  // }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

}
