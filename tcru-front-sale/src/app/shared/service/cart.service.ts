import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from 'src/app/content/shop/cart/cart-datasource';
import { Product } from 'src/app/content/shop/shopview/interfaces/product';
import { ApiConstants } from '../constants/ApiConstants';
import { Promotion } from 'src/app/shared/interface/promotion';
import { ShippingBrand } from 'src/app/shared/interface/shipping-brand';
import { Shippingcost } from 'src/app/shared/interface/shippingcost';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }
  cartUrl = 'api/cart'

  changeCount() {
    this.subject.next();
  }
  getChangeEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getShippingBrand() {
    return this.http.get<ShippingBrand[]>(`${ApiConstants.baseURl}${ApiConstants.shippingBrandURL}`);
  }

  getShippingCost() {
    return this.http.get<Shippingcost[]>(`${ApiConstants.baseURl}${ApiConstants.shippingCostURL}`);
  }

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

  addOrder(data) {
    return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.orderURL}`, data)
  }

  deleteFromCart(data) {
    return this.http.post(`${ApiConstants.baseURl}${ApiConstants.deleteFromCartURL}`, data)
  }

  uploadSlip(data) {
    return this.http.post(`${ApiConstants.baseURl}${ApiConstants.uploadSlipURL}`, data)
  }



  // checkoutCart(data, data2) {
  //   return this.http.post<Product>(`${ApiConstants.baseURl}${ApiConstants.checkoutCartURL}`, {"":data,"":data2} )
  // }







}
