import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import { Tax } from '../interfaces/tax';


@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) { }

  getTax(data) {
    return this.http.get<Tax[]>(`${ApiConstants.baseURl}${ApiConstants.gettaxURL}/${data}`);
  }

  getOneTax(data) {
    return this.http.get<Tax>(`${ApiConstants.baseURl}${ApiConstants.getonetaxURL}/${data}`);
  }

  deleteTax(data) {
    return this.http.delete(`${ApiConstants.baseURl}${ApiConstants.gettaxURL}/${data}`);
  }

  editTax(data) {
    return this.http.post<Tax[]>(`${ApiConstants.baseURl}${ApiConstants.edittaxURL}`, data);
  }

  addTax(data) {
    return this.http.post<Tax[]>(`${ApiConstants.baseURl}${ApiConstants.gettaxURL}`, data);
  }




  editStatusTax(data){
    return this.http.post<Tax[]>(`${ApiConstants.baseURl}${ApiConstants.editTaxStatusURL}`, data);
  }



}
