import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import { CartItem } from '../models/cart-item';
import { Product } from '../productview/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cartUrl = 'api/cart'

  // getAumphure(data) {
  //   return this.http.post<Amphure[]>(`${ApiConstants.baseURl}${ApiConstants.aumphureURl}`, data);
  // }


  getCartItemList(data) {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.getcartproductURL}/${data}`);
  }

  searchProduct(data) {
    return this.http.get<Product>(`${ApiConstants.baseURl}${ApiConstants.searchcartproductURL}/${data}`);
  }

  addToCart(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.addproductcartURL}`, data);
  }

  addMore(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.addmoreproductcartURL}`, data);
  }



  getCartItems(): Observable<CartItem[]> {

    return this.http.get<CartItem[]>(this.cartUrl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        for (let item of result) {
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].qty++
              productExists = true
              break;
            }
          }

          if (!productExists) {
            cartItems.push(new CartItem(item.id, item.product));
          }
        }

        return cartItems;
      })
    );
  }

  // addProductToCart(product: Product): Observable<any> {
  //   return this.http.post(cartUrl, { product });
  // }



}
