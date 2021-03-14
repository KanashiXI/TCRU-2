import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { lotp } from 'src/app/models/lotp.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LotpService {

  constructor(private httpClient: HttpClient) { }
  getData() {
    return this.httpClient.get('http://localhost:5000/api/lotp');
  }

  addlotp(data)
  {
   return this.httpClient.post('http://localhost:5000/api/lotp',data);
  }
  getproduct(){
    return this.httpClient.get('http://localhost:5000/api/product');
   }
  //  getlotp(data){
  //   return this.httpClient.get('http://localhost:5000/api/lotp',data);
  //  }
   getonelotp(id){
    return this.httpClient.get('http://localhost:5000/api/lotp/'+id);
   }
   getstock_product(){
    return this.httpClient.get('http://localhost:5000/api/stock_product');
   }
   

   getlotp(id)
   {
    return this.httpClient.get('http://localhost:5000/api/lotp/'+id);
   }
   getlotp11()
   {
    return this.httpClient.get('http://localhost:5000/api/lotp111/');
   }


}
