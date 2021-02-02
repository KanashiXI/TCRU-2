import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenService } from 'src/app/shared/service/token.service';


@Component({
    selector: 'app-menubar',
    templateUrl: './menubar.component.html',
    styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
    public loggedIn: boolean;
    //   megaItems: MegaMenuItem[];
    items: MenuItem[];

    constructor(
        private Auth: AuthService,
        private router: Router,
        private Token: TokenService
    ) { }

    logout(event: MouseEvent) {
        event.preventDefault();
        this.Token.remove();
        this.Auth.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
    }

    ngOnInit(): void {
        this.Auth.authStatus.subscribe(value => this.loggedIn = value);
        this.items = [];
    }

}
