import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import { Product } from './../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductviewService {

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.productURL}`)
  }

  getProductType() {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.productTypeURL}`)
  }

  getHotProducte() {
    return this.http.get<Product[]>(`${ApiConstants.baseURl}${ApiConstants.getHotProductURL}`)
  }



}
