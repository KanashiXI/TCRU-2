import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { Observable, BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';
import { ApiConstants } from '../constants/ApiConstants';
// import { ShippingInterface } from './../interfaces/shippingInterface';
import { OrderInterface } from '../interfaces/orderInterface';
import { StatusInterface } from './../interfaces/statusInterface';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();
  dataSource: any;

  constructor(
    private http: HttpClient
  ) { }

  nextMessage(message: string) {
    this.message.next(message)
  }

  getShippingOrder() {
    return this.http.get<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getShippingOrderURL}`);
  }

  getOneShipping(data) {
    return this.http.get<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getOneShippingURL}/${data}`);
  }

  // getStatus() {
  //   return this.http.get<StatusInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getStatusURL}`);
  // }

  getStatus() {
    return this.http.get<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getStatusURL}`);
  }

  editStatus(data) {
    return this.http.post<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.editStatusURL}`, data);
  }

  getShippingAddress() {
    return this.http.get<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getShippingAddressURL}`);
  }

  getSlip(orderId) {
    return this.http.get<OrderInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getSlipURL}/${orderId}`)
  }

}
