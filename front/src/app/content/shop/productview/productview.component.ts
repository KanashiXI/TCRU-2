import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Productinterface } from 'src/app/shared/interface/productinterface';
import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from './interfaces/product';
import { ProductviewService } from './services/productview.service';

interface sortBy {
  sort: string,
  code: string
}
@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
@Injectable()
export class ProductviewComponent implements OnInit {

  activeIndex: number = 0;

  errorMessage: String;
  productList: Product[];

  products: Product[];

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(private productViewService: ProductviewService) { }
  ngOnInit(): void {

    this.productViewService.getProduct().subscribe(
      res => {
        this.productList = res;

      },
      error => this.errorMessage = <any>error
    )
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

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
