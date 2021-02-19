import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
// import { Materialinterface } from '../interface/materialinterface';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Material } from './../models/Material.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getdate() {
    return this.http.get(environment.apiBaseUrl + '/categorymaterial' );
  }
}
