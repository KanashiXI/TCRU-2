import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiConstants } from './../constants/ApiConstants';
import { FaqInterface } from './../interface/faq';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();  

  constructor(
    private http: HttpClient
  ) { }

  nextMessage(message: string) {
    this.message.next(message)
  }

  getFaq(){
    return this.http.get<FaqInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getFaqURL}`)
  }

}
