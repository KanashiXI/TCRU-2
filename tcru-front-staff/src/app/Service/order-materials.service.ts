import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OrderMaterial } from '../OrderMaterials/Interface/OrderMaterial';

@Injectable({
  providedIn: 'root'
})
export class OrderMaterialsService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:5000/api/orderMaterials');
  }

  getData1(data)
  {
    return this.http.post('http://localhost:5000/api/addorderM', data);
  }

}
