import { Component, OnInit } from '@angular/core';
import { MessengerService } from './../../services/messenger.service';
import { Subject } from 'rxjs';
import { Product } from '../../productview/interfaces/product';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart-show',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  counter: number = 0;

  cartItem = []
  cartTotal = 0
  productInCart: Product[]
  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    //แสดงรายการสินค้าในตะกร้าสินค้า
    this.queryCartProduct(requestData.customerUsername)





    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
    })
  }

  decrese() {
    console.log('hey decrese');
    if (this.counter - 1 > 0) {
      this.counter--;
    }

  }

  increse() {
    if (this.counter + 1 < 100) {
      this.counter++;
    }

  }

  addOne(productInOrder) {
    // productInOrder.count++;
    // CartComponent.validateCount(productInOrder);
    // if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }

  minusOne(productInOrder) {
    // productInOrder.count--;
    // CartComponent.validateCount(productInOrder);
    // if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }

  onChange(productInOrder) {
    // CartComponent.validateCount(productInOrder);
    // if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }

  queryCartProduct(user_id) {
    this.cartService.getCartItemList(user_id).subscribe(res => {
      this.productInCart = res;
    }
    )
  }

  addProductToCart(product: Product) {

    let productExists = false

    for (let i in this.cartItem) {
      if (this.cartItem[i].product_id === product.product_id) {
        this.cartItem[i].quantity++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      this.cartItem.push({
        product_id: product.product_id,
        product_name: product.product_name,
        quantity: 1,
        retail_price: product.retail_price
      })
    }

    // for(let i in this.cartItem){
    //   if(this.cartItem[i].product_id === product.product_id){
    //     this.cartItem[i].quantity++
    //   }else{
    //      this.cartItem.push({
    //         product_id: product.product_id,
    //         product_name: product.product_name,
    //         quantity: 1,
    //         product_price: product.retail_price
    //       })
    //      }

    // }

    this.cartTotal = 0;
    this.cartItem.forEach(item => {
      this.cartTotal += (item.quantity * item.product_price)
    })


  }

}
