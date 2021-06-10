import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiConstants } from './../constants/ApiConstants';
import { InstructionInterface } from './../TCRU/instruction/interface/instructionInterface';

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

  addInstruction(data){
    return this.http.post<InstructionInterface[]>(`${ApiConstants.baseURl}${ApiConstants.addInstructionURL}`, data);
  }

  getInstruction(){
    return this.http.get<InstructionInterface[]>(`${ApiConstants.baseURl}${ApiConstants.getInstructionURL}`)
  }

  deleteInstruction(data) {
    return this.http.delete(`${ApiConstants.baseURl}${ApiConstants.deleteInstructionURL}/${data}`);
  }
  
  getOneInstruction(data) {
    return this.http.get<InstructionInterface>(`${ApiConstants.baseURl}${ApiConstants.getOneInstructionURL}/${data}`);
  }
  
  editInstruction(data) {
    return this.http.post<InstructionInterface[]>(`${ApiConstants.baseURl}${ApiConstants.editInstructionURL}`, data);
  }

}
