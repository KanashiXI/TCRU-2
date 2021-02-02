import { EditprofileComponent } from './content/user/editprofile/editprofile.component';
// import { CartComponent } from './content/dealing/cart/cart.component';
import { ProductDetailComponent } from './content/shop/productDetail/productDetail.component';
import { ProductInfoComponent } from './content/shop/productInfo/productInfo.component';
import { PleaseCheckMailComponent } from './content/auth/pleaseCheckMail/pleaseCheckMail.component';
import { ResetPasswordComponent } from './content/auth/resetPassword/resetPassword.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { ProfileComponent } from './content/user/profile/profile.component';
import { SigninComponent } from './content/auth/signin/signin.component';
import { BeforeLoginService } from './shared/service/before-login.service';
import { AfterLoginService } from './shared/service/after-login.service';
import { ProductviewComponent } from './content/shop/productview/productview.component';
import { TaxinvoiceComponent } from './content/user/taxinvoice/taxinvoice.component';
import { AddressComponent } from './content/user/address/address.component';
import { ShowaddressComponent } from './content/user/showaddress/showaddress.component';
import { EditaddressComponent } from './content/user/editaddress/editaddress.component';
import { ShowtaxComponent } from './content/user/taxinvoice/showtax/showtax.component';
import { InserttaxComponent } from './content/user/taxinvoice/inserttax/inserttax.component';
import { EdittaxComponent } from './content/user/taxinvoice/edittax/edittax.component';
import { CartComponent } from './content/shop/cart/cart/cart.component';
import { StockComponent } from './content/management/stock/stock.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';



const routes: Routes = [
  {
    path: '',
    component: ProductviewComponent,

  },
  {
    path: 'cartshow',
    component: CartComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [AfterLoginService]
  },
  // {
  //   path: 'signin',
  //   component: SigninComponent
  // },
  {
    path: 'login/resetpassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'login/resetpassword/checkmail',
    component: PleaseCheckMailComponent,
  },
  {
    path: 'productinfo',
    component: ProductInfoComponent,
  },
  // {
  //   path: 'product',
  //   component: ProductviewComponent,
  // },
  {
    path: 'productview/productdetail/:product_id',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'showaddress',
    component: ShowaddressComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'editaddress',
    component: EditaddressComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'showtax',
    component: ShowtaxComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'inserttax',
    component: InserttaxComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'edittax',
    component: EdittaxComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
