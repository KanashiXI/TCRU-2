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
      labels: ["ไตรโคเดอร์มา", "บิวเวอร์เรีย", "เมธาไรเซียม"],
      datasets: [
        {
          label: "เบิกขายนอกสถานที่",
          data: [10, 30, 50],
          backgroundColor : ['#9b59b6', '#9b59b6', '#9b59b6']
        },
        {
          label: "เบิกขายหน้าร้าน",
          data: [10, 30, 50],
          backgroundColor : ['#1abc9c', '#1abc9c', '#1abc9c']
        }
      ],
      
    };
    
    
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

}