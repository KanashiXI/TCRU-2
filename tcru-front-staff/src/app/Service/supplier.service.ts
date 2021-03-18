import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { supplier } from 'src/app/models/supplier.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:5000/api/supplier11');
  }
  getDatamaterial() {
    return this.httpClient.get('http://localhost:5000/api/material');
  }
  getData1(data)
  {
   return this.httpClient.post('http://localhost:5000/api/supplier',data);
  }
  addsupplier(data)
  {
   return this.httpClient.post('http://localhost:5000/api/supplier',data);
  }

  deletesupplier(id) {
    return this.httpClient.delete('http://localhost:5000/api/delete1/'+id);
  }
  geteditsupplier(id){
    return this.httpClient.get('http://localhost:5000/api/getsupplier1/'+id);
   }

   editsupplier(id,data)
   {
    return this.httpClient.patch('http://localhost:5000/api/supplierupdate1/'+id,data);
   }
}