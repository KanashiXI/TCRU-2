import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private iss = {
    login: 'http://localhost:5000/api/login'
  }

  constructor() { }

  handle(token)
  {
    this.set(token);
  }

  set(token)
  {
    localStorage.setItem('token', token);
  }

  get()
  {
    return localStorage.getItem('token');
  }

  romove()
  {
    localStorage.removeItem('token');
  }

  isValid()
  {
    const token = this.get();
    if(token)
    {
      const payload = this.payload(token);

      if(payload)
      {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token)
  {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload)
  {
    return JSON.parse(atob(payload));
  }

  loggedIn()
  {
    return this.isValid();
  }
}
