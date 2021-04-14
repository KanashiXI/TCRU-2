import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../shop/shopview/interfaces/product';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  eventSubscription: Subscription;

  public loggedIn: boolean;

  sumProductInCart: Number = 0;
  productInCart: Product[] = [];
  cartTotal: number = 0;


  loadUpdateCart: boolean = false;
  editProductQuantityForm: FormGroup;
  reactiveForm: FormGroup;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private cartService: CartService,
    private fb: FormBuilder,

  ) {
    this.eventSubscription = this.cartService.getChangeEvent().subscribe(() => {
      this.ngOnInit()
    })
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    this.queryCartProduct(requestData.customerUsername);
  }

  createForm(uId) {
    this.reactiveForm = this.fb.group({
      order_id: ['',],
    })

    this.reactiveForm.patchValue({
      user_id: uId,
    })

    this.editProductQuantityForm = this.fb.group({
      product_id: [''],
      product_quantity: [''],
      user_id: [''],
    })
  }

  queryCartProduct(user_id) {
    this.cartService.getCartItemList(user_id).subscribe(res => {
      this.productInCart = res;
    })
  }

  ngAfterContentChecked() {
    this.cartTotal = 0;
    this.productInCart.map((obj) => {
      this.cartTotal += Number(obj.product_quantity);
    });
  }

}
