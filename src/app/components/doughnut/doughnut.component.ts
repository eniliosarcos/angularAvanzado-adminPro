import { Component, Input, OnInit } from '@angular/core';
import { ChartData, Color} from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {

  @Input() title: string = 'Sin titulo';
  @Input() doughnutData: ChartData<'doughnut'> = {
    labels: [ 'label1', 'label2', 'label3' ],
    datasets: [
      { data: [ 250, 130, 70 ] }
    ]
  };;

  constructor() { }

  ngOnInit(): void {
  }

}
