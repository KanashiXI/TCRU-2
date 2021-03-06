// import { Promotion } from './../TCRU/promotion/interfaces/promotion';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiConstants } from './../constants/ApiConstants';
import { PromotionInteface } from './../TCRU/promotion/interfaces/promotioninterface';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPromotion() {
    return this.http.get<PromotionInteface[]>(`${ApiConstants.baseURl}${ApiConstants.getPromotionURL}`)
  }

  addPromotion(data) {
    return this.http.post<PromotionInteface[]>(`${ApiConstants.baseURl}${ApiConstants.addPromotionURL}`, data);
  }

  deletePromotion(data) {
    return this.http.delete(`${ApiConstants.baseURl}${ApiConstants.deletePromotionURL}/${data}`);
  }

}
