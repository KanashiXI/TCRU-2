import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { Observable, BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';
import { ApiConstants } from '../constants/ApiConstants';
// import { ShippingInterface } from './../interfaces/shippingInterface';
import { OrderInterface } from '../interfaces/orderInterface';
import { StatusInterface } from './../interfaces/statusInterface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();
  dataSource: any;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document

  ) { }

  nextMessage(message: string) {
    this.message.next(message)
  }

  getOneStatus(data) {
    return this.http.get<OrderInterface>(`${ApiConstants.baseURl}${ApiConstants.getOneStatusURL}/${data}`);
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

  getProductReport(dateFrom, dateTo) {
    return this.http.get<any>(`${ApiConstants.baseURl}${ApiConstants.getExportURL}/${dateFrom}/${dateTo}`, { responseType: 'blob' as 'json', observe: 'response' })
      .pipe(
        map((result: HttpResponse<Blob>) => {
          return result.body
        }))
  }

  getReportAddress(dateFrom, dateTo) {
    return this.http.get<any>(`${ApiConstants.baseURl}${ApiConstants.getExportAddressURL}/${dateFrom}/${dateTo}`, { responseType: 'blob' as 'json', observe: 'response' })
      .pipe(
        map((result: HttpResponse<Blob>) => {
          return result.body
        }))
  }

  download(blob: Blob, name: string) {
    const a = this.document.createElement("a");
    this.document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);

  }

}
