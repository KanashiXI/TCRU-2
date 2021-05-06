import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class chartsComponent implements OnInit {
  
  
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  constructor() { }

  ngOnInit() {
    this.typeChart = 'bar';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
      datasets: [
        {
          label: "My Stats Chart",
          data: [10, 30, 50, 30, 40, 30, 50, 30, 30, 50, 30, 50, 30],
          backgroundColor : ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12']
        },
        {
          label: "My Stats Chart2",
          data: [10, 30, 50, 30, 40, 30, 50, 30, 30, 50, 30, 50, 30],
          backgroundColor : ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12']
        }
        ,
        {
          label: "My Stats Chart2",
          data: [10, 30, 50, 30, 40, 30, 50, 30, 30, 50, 30, 50, 30],
          backgroundColor : ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12']
        }
      ],
      
    };
    
    
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

}