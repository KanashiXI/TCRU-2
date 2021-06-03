import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiConstants } from './../constants/ApiConstants';
import { FaqInterface } from './../TCRU/faq/interface/faqInterface';

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

  addFaq(data){
    return this.http.post<FaqInterface[]>(`${ApiConstants.baseURl}${ApiConstants.addFaqURL}`, data);
  }

}
