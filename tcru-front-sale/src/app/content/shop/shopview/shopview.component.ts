import { Component, Injectable, OnInit } from '@angular/core';
import { Product } from './interfaces/product';
import { ProductviewService } from './services/productview.service';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-shopview',
  templateUrl: './shopview.component.html',
  styleUrls: ['./shopview.component.css']
})

@Injectable()
export class ShopviewComponent implements OnInit {

  activeIndex: number = 0;

  errorMessage: String;
  productList: Product[];

  products: Product[];
  sortOrder: number;
  sortField: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  constructor(
    private productViewService: ProductviewService
  ) { }

  ngOnInit() {
    
    this.productViewService.getProduct().subscribe(
      res => {
        this.productList = res;

      },
      error => this.errorMessage = <any>error
    )

  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
