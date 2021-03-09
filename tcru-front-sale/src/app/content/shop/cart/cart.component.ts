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
import { style, state, animate, transition, trigger } from '@angular/animations';
import { Address } from '../../user/addaddress/interfaces/address';
import { AddressService } from '../../user/addaddress/services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  // dataSource: CartDataSource;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cartStatus: boolean = false;

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
  tempSelect: Product[] = [];
  selectItemForDelete: Product[] = [];
  arr: any[] = [];
  value = 0;
  reactiveForm: FormGroup;
  dataForm: Product;
  step: Number = 1;
  shippingAddressList: Address[] = [];
  dataSource: Address[] = [];
  statusAddIsNull: boolean;
  constructor(
    private router: Router,
    private addressService: AddressService,
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
    this.getUserAddress(requestData.customerUsername)
    // customerUsername: localStorage.getItem('user_id'),
    this.createForm(requestData.customerUsername);
    this.queryCartProduct(requestData.customerUsername);
    this.getCartPromotion();
  }

  getUserAddress(user_id) {
    this.addressService.getShippingAddress(user_id).subscribe(data => {
      this.shippingAddressList = data;
      this.filterAdd();
      if (this.shippingAddressList.length == 0) {
        this.statusAddIsNull = true;
      } else {
        this.statusAddIsNull = false;
      }
    });
  }

  filterAdd() {
    this.dataSource = this.shippingAddressList.filter((value, index) => {
      return value.status == 1;
    });

    this.reactiveForm.patchValue({
      address_id: this.dataSource[0].address_id,
    })

  }

  changestatusCart() {
    this.cartStatus = true;
  }
  backstatusCart() {
    // this.cartStatus = false;
    // this.router.navigateByUrl('');
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
      address_id: [''],
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
        this.cartService.addOrder(this.reactiveForm.getRawValue()).subscribe(
          res => {
            this.cartService.deleteFromCart(this.selectItem).subscribe();
          }

        );
        // this.cartService.deleteFromCart(this.selectItemForDelete).subscribe();

      },
      error => {

      }

    );
  }

  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    console.log()
    this.selectItem = this.productInCart.filter((value, index) => {
      return value.checked;
    });
    // this.selectItemForDelete = this.productInCart.filter((value, index) => {
    //   return value.product_id;
    // });


    // this.productInCart.map((obj) => {
    //   this.selectItemForDelete.product_id;
    // });
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
    // console.log('after' + this.totalPrice)
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
      // console.log(this.isGotPromotion)
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
    if (cart.product_quantity > 1) {
      cart.product_quantity--;
    }
    cart.retail_price -= cart.price_per_piece;
  }

  handlePlus(cart) {
    // if(cart.product_quantity < cart.stock){
    //   กดเพิ่มได้
    // }
    cart.product_quantity++;
    const oddRetail = Number(cart.retail_price);
    const sumRetail = Number(cart.price_per_piece) + oddRetail;
    cart.retail_price = sumRetail;
  }


}
