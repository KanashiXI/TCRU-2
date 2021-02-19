import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeterialserviceService {
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:5000/api/material');
  }
  getData1(data)
  {
   return this.httpClient.post('http://localhost:5000/api/material1',data);
  }
  getcategory(){
    return this.httpClient.get('http://localhost:5000/api/category');
   }

  addMaterialtData(data)
  {
   return this.httpClient.post('http://localhost:5000/api/material',data);
  }

  deleteMaterial(id) {
    return this.httpClient.delete('http://localhost:5000/api/delete/'+id);
  }
  geteditmaterial(id){
    return this.httpClient.get('http://localhost:5000/api/getMaterial/'+id);
   }

   editMaterial(id,data)
   {
    return this.httpClient.patch('http://localhost:5000/api/update/'+id,data);
   }
}