import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productInfo',
  templateUrl: './productInfo.component.html',
  styleUrls: ['./productInfo.component.css']
})
export class ProductInfoComponent implements OnInit {

  activeIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
