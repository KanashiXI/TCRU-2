// import { Promotion } from './../TCRU/promotion/interfaces/promotion';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion} from '../Models/Promotion.model'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  apiBaseURL = 'http://127.0.0.1:5000/api/'
  noAuthHeader = { header: new HttpHeaders({ NoAuth: 'True' }) };
  selectedPromotion: Promotion = new Promotion();
  promotion: Promotion[];

  constructor(
    private http: HttpClient
  ) { }

  getPromotion() {
    let httpParams = new HttpParams();

    const observable = this.http.get<any[]>('Promotion', { params: httpParams })
    return observable;

    // return this.http.get<Promotion[]>(`${ApiConstants.baseURl}${ApiConstants.getPromotionURL}`)
  }

  // getData() {
  //   return this.http.get('http://localhost:5000/api/promotion');
  // }

  public getData(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`http://localhost:5000/api/promotion`);
}

}
