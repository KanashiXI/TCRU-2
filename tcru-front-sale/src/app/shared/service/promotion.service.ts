import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
import { Promotion } from './../interface/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient
  ) { }

  getPromotion() {
    return this.http.get<Promotion[]>(`${ApiConstants.baseURl}${ApiConstants.getPromotionURL}`)
  }


}
