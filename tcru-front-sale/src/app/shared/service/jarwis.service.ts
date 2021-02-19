import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JarwisService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}/api/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/api/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/api/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/api/resetPassword`, data)
  }

  editProfile(data) {
    return this.http.post(`${this.baseUrl}/api/editprofile`, data)
  }

  setRole(data) {
    return this.http.post(`${this.baseUrl}/api/setrole`, data)
  }

  // profileUser(data): Observable<any> {
  //   return this.http.get('http://127.0.0.1:8000/api/profile');
  // }

}
