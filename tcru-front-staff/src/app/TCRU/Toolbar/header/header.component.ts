import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { JarwisService } from '../../../Service/jarwis.service';
import { TokenService } from '../../../Service/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) { }
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.romove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
