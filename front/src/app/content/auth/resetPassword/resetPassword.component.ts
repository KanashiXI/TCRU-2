import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  displayModal: boolean;

  constructor() { }

  ngOnInit() {
    
  }

  showModalDialog() {
    this.displayModal = true;
  }

}
