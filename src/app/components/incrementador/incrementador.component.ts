import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input('valor') progress: number = 30;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valueProgress: EventEmitter<number> = new EventEmitter();

  changeValueButton( value:number){

    if(this.progress >= 100 && value >=0 ){
      this.valueProgress.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value <0 ){
      this.valueProgress.emit(0);
      return this.progress = 0;
    }

    this.valueProgress.emit(this.progress+value);
    return this.progress = this.progress + value;
  }

  onChange(value:number){

    if(value >= 100){
      this.progress = 100;
    } else if(value <= 0){
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.valueProgress.emit(this.progress);
  }

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

}
