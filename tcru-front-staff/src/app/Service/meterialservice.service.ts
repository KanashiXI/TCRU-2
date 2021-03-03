import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Materialinterface } from 'src/app/interface/materialinterface';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MeterialserviceService {
  constructor(private httpClient: HttpClient,) { }

  getData() {
    return this.httpClient.get('http://localhost:5000/api/material');
  }
  getByname(material_name: string): Observable<Materialinterface[]> {
    console.log('sssss')
    const a = this.httpClient.get<Materialinterface[]>('http://localhost:5000/api/getByname/'+material_name)
    console.log(a)
    return a;
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