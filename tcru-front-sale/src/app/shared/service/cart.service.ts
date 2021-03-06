import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/content/shop/cart/cart-datasource';
import { Product } from 'src/app/content/shop/shopview/interfaces/product';
import { ApiConstants } from '../constants/ApiConstants';
import { Promotion } from 'src/app/shared/interface/promotion';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cartUrl = 'api/cart'
  getCartPromotion() {
    return this.http.get<Promotion[]>(`${ApiConstants.baseURl}${ApiConstants.getCartPromotionURL}`);
  }

  getCartItemList(data) {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.getcartproductURL}/${data}`);
  }

  searchProduct(productid, userid) {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.searchcartproductURL}/${productid}/${userid}`);
  }

  addToCart(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.addproductcartURL}`, data);
  }

  addMore(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.addmoreproductcartURL}`, data);
  }

  remove(data: string) {
    return this.http.delete(`${ApiConstants.baseURl}${ApiConstants.deleteproductcartURL}/${data}`);
  }

  editQuantityProductInCart(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.addmoreproductcartURL}`, data);
  }

  checkoutCart(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.checkoutCartURL}`, data)
  }


  // checkoutCart(data, data2) {
  //   return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.checkoutCartURL}`, {"":data,"":data2} )
  // }







}
