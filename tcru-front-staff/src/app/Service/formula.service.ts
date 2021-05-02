import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  constructor(private httpClient: HttpClient,) { }
  addformula(data)
  {
   return this.httpClient.post('http://localhost:5000/api/formula',data);
  }
  getformula(){
    return this.httpClient.get('http://localhost:5000/api/formula');
   }
   getDatamaterial() {
    return this.httpClient.get('http://localhost:5000/api/material');
  }
  getDataproduct(){
    return this.httpClient.get('http://localhost:5000/api/getProduct');
  }
  getformulaid(id)
  {
   return this.httpClient.get('http://localhost:5000/api/formula1/'+id);
  }
  deleteFormula(id) {
    return this.httpClient.delete('http://localhost:5000/api/deleteFormula/'+id);
  }
  MaterialCategory(data){
    return this.httpClient.post('http://localhost:5000/api/MaterialCategory',data);
  }
  getcategory(){
    return this.httpClient.get('http://localhost:5000/api/categorym');
   }
   formulabyproduct(data){
    return this.httpClient.post('http://localhost:5000/api/formulabyproduct',data);
  }

}
