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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  promotionId: number;

  isGotPromotion: boolean = false;
  totalPrice: number;
  discount: number;
  condition: number;
  gun: string;
  selectItem: Product[] = [];
  arr: any[] = [];
  value = 0;
  reactiveForm: FormGroup;
  dataForm: Product;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.selectItem.values())
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    // customerUsername: localStorage.getItem('user_id'),
    this.createForm(requestData.customerUsername);
    this.queryCartProduct(requestData.customerUsername);
    this.getCartPromotion();
  }

  createForm(uId) {
    this.reactiveForm = this.fb.group({
      order_id: ['',],
      user_id: ['',],
      net_amount: ['',],
      total_price: ['',],
      promotion_id: ['',],
      discount: ['',],
      request_tax: ['',],
    })
    this.reactiveForm.patchValue({
      user_id: uId,
    })
  }

  checkoutCart() {

    // const jsonValue = JSON.stringify(this.selectItem);
    this.cartService.checkoutCart(this.selectItem).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          order_id: this.dataForm,
        });
        this.cartService.addOrder(this.reactiveForm.getRawValue()).subscribe();
      },
      error => {

      }

    );
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
      this.promotionId = this.promotionData[0].promotion_id;
    })
  }

  queryCartProduct(user_id) {
    this.cartService.getCartItemList(user_id).subscribe(res => {
      this.productInCart = res;
    })
  }

  remove(id: string) {
    this.cartService.remove(id).subscribe(res => {
      this.ngOnInit()
      //dialog ลบสำเร็จ
    }
    );
  }

  ngAfterContentChecked() {

    this.cartTotal = 0;
    this.selectItem.map((obj) => {
      this.cartTotal += Number(obj.retail_price);
    });
    this.totalPrice = this.cartTotal;
    console.log('after' + this.totalPrice)
    if (this.promotionNumber > 0 && this.totalPrice >= this.condition) {
      this.isGotPromotion = true;
      this.discount = (this.cartTotal * (this.promotionNumber / 100))
      this.cartTotal = this.cartTotal - this.discount;

      this.reactiveForm.patchValue({
        discount: this.discount,
        net_amount: this.cartTotal,
        promotion_id: this.promotionId,
        total_price: this.totalPrice,
      })

    } else {
      console.log(this.isGotPromotion)
      this.isGotPromotion = false;
      this.reactiveForm.patchValue({
        discount: this.discount,
        net_amount: this.cartTotal,
        promotion_id: 0,
        total_price: this.totalPrice
      })
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
