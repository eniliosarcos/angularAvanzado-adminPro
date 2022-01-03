import { Component, OnInit } from '@angular/core';
import { ChartData, Color } from 'chart.js';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  doughnutData1: ChartData<'doughnut'> = {
    labels: [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ],
    datasets: [
      {
        data: [ 350, 450, 100 ],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      },
    ]
  };


  constructor() { }

  ngOnInit(): void {
  }

}
