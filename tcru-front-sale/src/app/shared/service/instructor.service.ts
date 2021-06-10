import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiConstants } from './../constants/ApiConstants';
import { InstructionInterface } from './../interface/instructionInterface';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();  

  constructor(
    private http: HttpClient
  ) { } 

  nextMessage(message: string) {
    this.message.next(message)
  }

  getInstruction(){
    return this.http.get<InstructionInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getInstructionURL}`)
  }

}
