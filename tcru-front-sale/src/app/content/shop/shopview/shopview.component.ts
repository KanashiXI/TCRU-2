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

  typeList: Product[] = [];
  productOnfilter: Product[] = [];

  // foods: Food[] = [
  //   { value: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' }
  // ];

  constructor(
    private productViewService: ProductviewService
  ) { }

  ngOnInit() {

    this.productViewService.getProductType().subscribe(
      res => {
        this.typeList = res;
        this.productViewService.getProduct().subscribe(
          res => {
            this.productList = res;
            this.onClickSelectType(0)
          },
          error => this.errorMessage = <any>error
        )
      }
    )

  }

  onClickSelectType(index) {
    this.productOnfilter = this.productList.filter((element) => this.filterByType(element, index));
    console.log(this.productOnfilter)
  }

  filterByType(element, index) {
    return (element.product_type == this.typeList[index].product_type)
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
