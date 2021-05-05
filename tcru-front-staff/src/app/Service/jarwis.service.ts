import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JarwisService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  login(data)
  {
    return this.http.post('http://localhost:5000/api/login', data)
  }
}
