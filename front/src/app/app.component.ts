import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './shared/auth-state.service';
import { TokenService } from './shared/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ศูนย์ผลิตและบริการชีวินทรีย์เกษตร มหาวิทยาลัยวลัยลักษณ์';

  isSignedIn: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) { }
  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['signin']);
  }
}
