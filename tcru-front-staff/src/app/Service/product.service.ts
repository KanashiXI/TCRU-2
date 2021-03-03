import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:5000/api/product');
  }
  getData1(data)
  {
   return this.httpClient.post('http://localhost:5000/api/product1',data);
  }
  getcategory(){
    return this.httpClient.get('http://localhost:5000/api/category');
   }

  addProductData(data)
  {
   return this.httpClient.post('http://localhost:5000/api/product',data);
  }

  deleteProduct(id) {
    return this.httpClient.delete('http://localhost:5000/api/delete1/'+id);
  }
  geteditProduct(id){
    return this.httpClient.get('http://localhost:5000/api/getproduct1/'+id);
   }

   editProduct(id,data)
   {
    return this.httpClient.patch('http://localhost:5000/api/update1/'+id,data);
   }
}