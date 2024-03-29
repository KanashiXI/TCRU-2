import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { Observable, BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';
import { ApiConstants } from '../constants/ApiConstants';
import { ShippingInterface } from './../interfaces/shippingInterface';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  nextMessage(message: string) {
    this.message.next(message)
  }

  getShippingOrder() {
    return this.http.get<ShippingInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getShippingOrderURL}`);
  }

  getOnePromotion(data) {
    return this.http.get<ShippingInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getOneShippingURL}/${data}`);
  }

}
