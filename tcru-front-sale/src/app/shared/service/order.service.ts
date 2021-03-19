import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../constants/ApiConstants';
import { Order } from '../interface/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: HttpClient) { }

  getOreder(id) {
    return this.http.get<Order[]>(`${ApiConstants.baseURl}${ApiConstants.orderURL}/${id}`)
  }

}
