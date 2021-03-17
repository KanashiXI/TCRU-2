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
}
