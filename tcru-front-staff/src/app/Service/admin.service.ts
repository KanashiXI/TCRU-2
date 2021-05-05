import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../Models/admin.model';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiConstants } from '../constants/ApiConstants';
import { AdminInterface } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminModel = new Subject<Admin[]>();
  private url = '/api/login/';

  constructor(private http: HttpClient) { }

  getAdmin(username: string): Observable<Admin>
  {
    return this.http.get<Admin>(`${ApiConstants.baseURl}${this.url}${username}`)
  }

  getAdminLogin(): Subject<Admin[]>
  {
    return this.adminModel;
  }
}
