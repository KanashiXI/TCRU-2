import { Component, OnInit, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Promotion } from 'src/app/shared/interface/promotion';
import { CartDataSource, CartItem } from './cart-datasource';
import { Product } from '../shopview/interfaces/product';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<CartItem>;
  // dataSource: CartDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];


  checked: boolean = false;
  counter: number = 0;
  cartItem = []
  cartTotal: number = 0
  productInCart: Product[] = []
  promotionData: Promotion[] = [];
  promotionNumber: number;
  discribePromotion: String;
  isGotPromotion: boolean = false
  totalPrice: number;
  discount: number;
  condition: number;
  gun: string;
  selectItem: Product[] = [];
  arr: any[] = [];


  value = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    console.log(this.selectItem.values())
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }

    this.queryCartProduct(requestData.customerUsername)
    this.getCartPromotion()
  }

  checkoutCart() {
    // const jsonValue = JSON.stringify(this.selectItem);
    this.cartService.checkoutCart(this.selectItem).subscribe()
    // console.log('okfoekrfokrofk' + this.selectItem)
  }

  changeSelection() {
    this.fetchSelectedItems()

  }

  fetchSelectedItems() {
    this.selectItem = this.productInCart.filter((value, index) => {
      return value.product_id
    });
  }


  // changeQuantity(cart, $event) {

  // }

  getCartPromotion() {
    this.cartService.getCartPromotion().subscribe(res => {
      this.promotionData = res;
      this.promotionNumber = this.promotionData[0].unit
      this.discribePromotion = this.promotionData[0].detail
      this.condition = this.promotionData[0].cost_condidtion
    })

  }

  queryCartProduct(user_id) {
    this.cartService.getCartItemList(user_id).subscribe(res => {
      this.productInCart = res;
    })
  }

  remove(id: string) {
    this.cartService.remove(id).subscribe(
    );
  }

  ngAfterContentChecked() {
    console.log('after content checked')
    this.cartTotal = 0;
    this.selectItem.map((obj) => {
      console.log(obj.retail_price)
      this.cartTotal += Number(obj.retail_price);
    });
    this.totalPrice = this.cartTotal;
    if (this.promotionNumber > 0 && this.totalPrice >= this.condition) {
      this.isGotPromotion = true
      this.discount = (this.cartTotal * (this.promotionNumber / 100))
      this.cartTotal = this.cartTotal - this.discount;
    } else {
      this.isGotPromotion = false
    }

  }

  handleMinus(cart) {
    cart.product_quantity--;
    // this.value--;
  }
  handlePlus(cart) {
    cart.product_quantity++;
  }


}
