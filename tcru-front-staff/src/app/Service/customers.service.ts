import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { customers } from '../Models/Customers.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  apiBaseURL = 'http://127.0.0.1:5000/api/'
  noAuthHeader = { header: new HttpHeaders({ NoAuth: 'True' }) };
  selectedCustomer: customers = new customers();
  customer: customers[];

  constructor(private http: HttpClient) { }

  fileUpload(fileItem: File, extraData?: object): any {
    let apiCreateEmdpoint = `${this.apiBaseURL}Customers`
    const formData: FormData = new FormData();
    formData.append('fileItem', fileItem, fileItem.name);

    if (extraData) {
      for (let key in extraData) {
        formData.append(key, extraData[key])
      }
    }
    const req = new HttpRequest('POST', apiCreateEmdpoint, formData, {
      reportProgress: true
    });
    return this.http.request(req)
  }

  optionalFileUpload(fileItem?: File, extraData?: object): any {
    let apiCreateEmdpoint = `${this.apiBaseURL}Customers`
    const formData: FormData = new FormData();
    let fileName;
    if (extraData) {
      for (let key in extraData) {
        if (key == 'fileName') {
          fileName = extraData[key];
        }
        formData.append(key, extraData[key])
      }
    }
    if (fileItem) {
      if (!fileName) {
        fileName = fileItem.name
      }
      formData.append('Excel', fileItem, fileName);
    }
    const req = new HttpRequest('POST', apiCreateEmdpoint, formData, {
      reportProgress: true
    });

    return this.http.request(req)
  }
  list(): Observable<any> {
    const listEndpoint = `${this.apiBaseURL}Customers`
    return this.http.get(listEndpoint)
  }

  showCustomer() {
    let httpParams = new HttpParams();

    const observable = this.http.get<any[]>('Customers', { params: httpParams })
    return observable;

  }
  getData1(data) {
    return this.http.post('http://localhost:5000/api/Customers', data);
  }
}
