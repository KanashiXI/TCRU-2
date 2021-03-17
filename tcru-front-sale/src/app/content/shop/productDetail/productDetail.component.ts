import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Product } from '../shopview/interfaces/product';
import { ProductService } from 'src/app/shared/service/product.service';
import { CartService } from 'src/app/shared/service/cart.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public loggedIn: boolean;
  checkStock: boolean = true;
  stock: number;
  productInfo: Product;
  counter: number = 1;
  reactiveForm: FormGroup;
  editProductQuantityForm: FormGroup;
  productName: string;
  productPrice: number
  productDescription: string;
  productUnit: string;
  productWeight: string;
  productCapacity: string;
  breakpoint: number;
  productInCart: Product[] = [];
  productDetailLoad: boolean = false;

  constructor(
    private Auth: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.createForm();
    this.getProduct();
  }

  handleAddToCart() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    console.log('กดเพิ่ม')
    this.calPrice()
    const productId = this.route.snapshot.paramMap.get('product_id');
    this.cartService.searchProduct(productId, requestData.customerUsername).subscribe(res => {
      this.productInCart = res;
      if (this.productInCart.length == 0) {
        var oldQuantity = 0;
        var oldPrice = 0;
      } else {
        var oldQuantity = this.productInCart[0].product_quantity;
        var oldPrice = this.productInCart[0].retail_price;
      }
      if (this.productInCart.length == 0) {
        const productPrice = this.route.snapshot.paramMap.get('price');
        console.log('pp is' + productPrice)
        var curQuantity = this.reactiveForm.get('product_quantity').value
        var curPrice = this.reactiveForm.get('retail_price').value
        this.reactiveForm.patchValue({
          price_per_piece: productPrice,
          product_quantity: curQuantity + 0,
          retail_price: Number(curPrice) + Number(0),
        })
        this.cartService.addToCart(this.reactiveForm.getRawValue()).subscribe()
      } else {
        var curQuantity = this.reactiveForm.get('product_quantity').value;
        var curPrice = this.reactiveForm.get('retail_price').value;
        this.editProductQuantityForm.patchValue({
          product_quantity: curQuantity + oldQuantity,
          retail_price: Number(curPrice) + Number(oldPrice),
        })
        this.cartService.editQuantityProductInCart(this.editProductQuantityForm.getRawValue()).subscribe();
      }
    });
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      product_name: [''],
      retail_price: [''],
      product_id: [''],
      product_quantity: [''],
      product_description: [''],
      price_per_piece: [''],
      weight: [''],
      unit: [''],
      user_id: [''],
      stock: [''],
    })

    this.editProductQuantityForm = this.fb.group({
      retail_price: [''],
      product_id: [''],
      product_quantity: [''],
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
          product_description: this.productInfo[0].product_description,
          user_id: requestData.customerUsername,
          weight: this.productInfo[0].weight,
          unit: this.productInfo[0].unit,
          stock: this.productInfo[0].stock,
        })
        this.editProductQuantityForm.patchValue({
          product_id: this.productInfo[0].product_id,
          user_id: requestData.customerUsername,
        })
        this.productName = this.reactiveForm.get('product_name').value
        this.productPrice = this.reactiveForm.get('retail_price').value
        this.productDescription = this.reactiveForm.get('product_description').value
        this.productWeight = this.reactiveForm.get('weight').value
        this.productUnit = this.reactiveForm.get('unit').value
        this.stock = this.reactiveForm.get('stock').value
        if (this.stock === 0) {
          this.checkStock = false;
        }
        this.productDetailLoad = true;
      }
    )
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

  calPrice() {
    const totalPrice = this.reactiveForm.get('retail_price').value
    this.reactiveForm.patchValue({
      product_quantity: this.counter,
      retail_price: totalPrice * this.counter
    })
  }

}



