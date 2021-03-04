import { Component, OnInit, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Promotion } from 'src/app/shared/interface/promotion';
import { CartDataSource, CartItem } from './cart-datasource';
import { Product } from '../shopview/interfaces/product';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // dataSource: CartDataSource;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  checked: boolean = false;
  counter: number = 0;
  cartItem = [];
  cartTotal: number = 0;
  productInCart: Product[] = [];
  promotionData: Promotion[] = [];
  promotionNumber: number;
  discribePromotion: String;
  isGotPromotion: boolean = false;
  totalPrice: number;
  discount: number;
  condition: number;
  gun: string;
  selectItem: Product[] = [];
  arr: any[] = [];
  value = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService
  ) { }

  ngOnInit() {
    console.log(this.selectItem.values())
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    this.queryCartProduct(requestData.customerUsername);
    this.getCartPromotion();
  }

  checkoutCart() {
    // const jsonValue = JSON.stringify(this.selectItem);
    this.cartService.checkoutCart(this.selectItem).subscribe();
    // console.log('okfoekrfokrofk' + this.selectItem);
  }

  changeSelection() {
    this.fetchSelectedItems();

  }

  fetchSelectedItems() {
    this.selectItem = this.productInCart.filter((value, index) => {
      return value.product_id;
    });
  }

  getCartPromotion() {
    this.cartService.getCartPromotion().subscribe(res => {
      this.promotionData = res;
      this.promotionNumber = this.promotionData[0].unit;
      this.discribePromotion = this.promotionData[0].detail;
      this.condition = this.promotionData[0].cost_condidtion;
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
    // console.log('after content checked');
    this.cartTotal = 0;
    this.selectItem.map((obj) => {
      // console.log(obj.retail_price)
      this.cartTotal += Number(obj.retail_price);
    });
    this.totalPrice = this.cartTotal;
    if (this.promotionNumber > 0 && this.totalPrice >= this.condition) {
      this.isGotPromotion = true;
      this.discount = (this.cartTotal * (this.promotionNumber / 100))
      this.cartTotal = this.cartTotal - this.discount;
    } else {
      this.isGotPromotion = false;
    }

  }

  handleMinus(cart) {
    const cost = cart.retail_price / cart.product_quantity;
    console.log(cost)
    cart.product_quantity--;
    // cart.retail_price -= cost;
  }

  handlePlus(cart) {
    const cost = cart.retail_price / cart.product_quantity;
    console.log(cost)
    cart.product_quantity++;
    // cart.retail_price = 10000;
  }


}
