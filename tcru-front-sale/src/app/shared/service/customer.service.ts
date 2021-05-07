import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Emloyeeinterface } from '../interface/emloyeeinterface';
import { map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { stringify } from 'querystring';
import { ApiConstants } from '../constants/ApiConstants';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  emloyeeinterface = new Subject<Emloyeeinterface[]>();
  private url = '/api/register/';
  private validateEmailURL = '/api/emailvailate/';
  private profileURL = '/api/editprofile/'

  
  constructor(private http: HttpClient) { }
  // getCustomer() {
  //   let httpParms = new HttpParams();
  //   const observable = this.http.get<Emloyeeinterface[]>(' ', { params: httpParms })
  //   return observable;
  // }
  getCustomer() {
    return this.http.get<Emloyeeinterface[]>(this.url).pipe(
      map(users => {
        const newUsers = [];
        for (let user of users) {
          // const email = user.mail;
          const uName = user.email;
          newUsers.push({ username: uName });
        }
        return newUsers;
      }),
      tap(users => console.log(users))
    )
  }

  // getCustomerByUsername(
  //   username: string
  // ): Observable<{ status: string; data: Emloyeeinterface; code: number }> {
  //   try {
  //     return this.http.get<Emloyeeinterface[]>(`${ApiConstants.baseURl}${this.url}${username}`).pipe(
  //       map(response => {
  //         this.emloyeeinterface.next(response["data"][0]);
  //         return {
  //           status: response["result"],
  //           code: response["code"],
  //           data: response["data"][0] as Emloyeeinterface
  //         };
  //       })
  //     );
  //   } catch (error) {
  //     console.table(error.message);
  //   }
  // }






  // getCustomerData(): Subject<Emloyeeinterface[]> {
  //   return this.emloyeeinterface;
  // }

  // getCustomerByUsername(username: string) {
  //   const user = this.http.get<Emloyeeinterface[]>(`${this.url}${username}`)
  //   return user;
  // }


  getCustomerByUsernameValidate(username: string): Observable<Emloyeeinterface[]> {
    return this.http.get<Emloyeeinterface[]>(`${ApiConstants.baseURl}${this.url}${username}`)

  }

  //เว็ค email ใช้อันนี้
  getCustomerByEmail(email: string): Observable<Emloyeeinterface[]> {
    console.log('sssss')
    const a = this.http.get<Emloyeeinterface[]>(`${ApiConstants.baseURl}${this.validateEmailURL}${email}`)
    console.log(a)
    return a;
  }

  getCustomerProfileByEmail(email: string): Observable<Emloyeeinterface> {
    return this.http.get<Emloyeeinterface>(`${ApiConstants.baseURl}${this.validateEmailURL}${email}`)
  }

  getCoupon(userId: string): Observable<Emloyeeinterface[]> {
    return this.http.get<Emloyeeinterface[]>(`${ApiConstants.baseURl}${ApiConstants.getcouponURL}/${userId}`)
  }

  editProfile(data) {
    return this.http.post(`${ApiConstants.baseURl}${this.validateEmailURL}`, data)
  }

  postCustomer(body: Emloyeeinterface) {
    return this.http.post(this.url, body)
  }

  getCustomerLogin(): Subject<Emloyeeinterface[]> {
    return this.emloyeeinterface;
  }

}
