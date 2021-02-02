import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from '../productview/interfaces/product';
import { CartService } from '../services/cart.service';

import { MessengerService } from '../services/messenger.service';


// import { Product } from './../productview/interfaces/product';

@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public loggedIn: boolean;
  // @Input() productItem: Product
  items: MenuItem[];
  // productInfo: ProductInfo;
  productInfo: Product;
  counter: number = 0;
  reactiveForm: FormGroup;
  productName: string
  productPrice: string
  productCapacity: string
  private cart: Product;
  checkProductInCart: Product;
  productList: Product[];
  price: number
  oldValue: number
  constructor(
    private Auth: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private msg: MessengerService,
    private fb: FormBuilder,
    private cartService: CartService,

  ) {
    // this.cart = new Product()
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.items = [
      { label: 'สินค้าทั้งหมด', url: '/' },
      { label: 'สินค้า...' },
    ];
    this.createForm();
    this.getProduct();

  }
  createForm() {
    this.reactiveForm = this.fb.group({
      product_name: [''],
      retail_price: [''],
      product_id: [''],
      product_quantity: [''],
      product_description: [''],
      user_id: [''],


    })

  }



  getProduct(): void {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    const productId = this.route.snapshot.paramMap.get('product_id');
    this.productService.getDetail(productId).subscribe(
      prod => {
        this.productInfo = prod;
        this.reactiveForm.patchValue({
          product_name: this.productInfo[0].product_name,
          retail_price: this.productInfo[0].retail_price,
          product_id: this.productInfo[0].product_id,
          // this.productInfo[0].product_quantity,
          product_quantity: 1,
          product_description: this.productInfo[0].product_description,
          user_id: requestData.customerUsername,
        })
        this.productName = this.reactiveForm.get('product_name').value
        this.productPrice = this.reactiveForm.get('retail_price').value
      }
    )
  }

  // checkproductInCart() {
  // }

  handleAddToCart() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }

    const productId = this.route.snapshot.paramMap.get('product_id');
    this.cartService.searchProduct(productId).subscribe(res => {

      // this.reactiveForm.patchValue({
      //   product_name: this.productInfo[0].product_name,
      //   retail_price: this.productInfo[0].retail_price,
      //   product_id: this.productInfo[0].product_id,
      //   product_quantity: this.productInfo[0].product_quantity,
      //   product_description: this.productInfo[0].product_description,
      //   user_id: requestData.customerUsername,
      // })
      // const value = this.reactiveForm.get('product_quantity').value
      // this.checkProductInCart = res;
      this.cartService.addToCart(this.reactiveForm.getRawValue()).subscribe()
      // this.oldValue = res.
      // if (this.checkProductInCart[0]?.product_id != null) {
      //   this.reactiveForm.patchValue({
      //     product_name: this.productInfo[0].product_name,
      //     retail_price: this.productInfo[0].retail_price,
      //     product_id: this.productInfo[0].product_id,
      //     product_quantity: this.productInfo[0].product_quantity + this.counter,
      //     product_description: this.productInfo[0].product_description,
      //     user_id: requestData.customerUsername,
      //   })
      //   this.cartService.addMore(this.reactiveForm.getRawValue()).subscribe()

      // } else {
      //   this.reactiveForm.patchValue({
      //     product_name: this.productInfo[0].product_name,
      //     retail_price: this.productInfo[0].retail_price,
      //     product_id: this.productInfo[0].product_id,
      //     product_quantity: 1,
      //     product_description: this.productInfo[0].product_description,
      //     user_id: requestData.customerUsername,
      //   })
      //   
      // }
    }
    );





    // console.log(this.productInfo)
    // this.msg.sendMsg(this.productInfo)
  }




  decrese() {
    if (this.counter - 1 > 0) {
      this.counter--;
    }
  }
  increse() {
    if (this.counter + 1 < 100) {
      this.counter++;
    }
  }

  // getProductList() {
  //   this.msg.getMsg().subscribe((prodList: Product[]) => {
  //     this.productList = prodList;
  //   })
  // }

}
