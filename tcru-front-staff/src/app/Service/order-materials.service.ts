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

  getsupplier()
  {
    return this.http.get('http://localhost:5000/api/supplier11');
  }

  getData1(data)
  {
    return this.http.post('http://localhost:5000/api/Ordermaterial1',data);
  }

  getunit_material(){
    return this.http.get('http://localhost:5000/api/unit_material');
  }

  getmaterial(){
    return this.http.get('http://localhost:5000/api/material');
  }

  addOrderM(data)
  {
    return this.http.post('http://localhost:5000/api/addorderM', data);
  }

  deleteOrderM(id)
  {
    return this.http.delete('http://localhost:5000/api/deleteOrderM/'+id)
  }

}
