import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ShopviewComponent } from './content/shop/shopview/shopview.component';
import { ProductDetailComponent } from './content/shop/productDetail/productDetail.component';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { ProfileComponent } from './content/user/profile/profile.component';
import { EditprofileComponent } from './content/user/editprofile/editprofile.component';
import { ShowaddressComponent } from './content/user/showaddress/showaddress.component';
import { AddaddressComponent } from './content/user/addaddress/addaddress.component';
import { EditaddressComponent } from './content/user/editaddress/editaddress.component';
import { ShowTaxAddressComponent } from './content/user/taxinvoice/showTaxAddress/showTaxAddress.component';
import { AddTaxAddressComponent } from './content/user/taxinvoice/addTaxAddress/addTaxAddress.component';
import { EditTaxAddressComponent } from './content/user/taxinvoice/editTaxAddress/editTaxAddress.component';
import { CartComponent } from './content/shop/cart/cart.component';
import { ShowPromotionComponent } from './content/promotion/showPromotion/showPromotion.component';
import { AddPromotionComponent } from './content/promotion/addPromotion/addPromotion.component';
import { ResponseResetComponent } from './content/auth/password/response-reset/response-reset.component';
import { RequestResetComponent } from './content/auth/password/request-reset/request-reset.component';

const routes: Routes = [
  {
    path: '',
    component: ShopviewComponent,
    // data: { breadcrumb: 'Home'}
  },
  {
    path: 'productdetail',
    component: ProductDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
  },
  {
    path: 'address',
    component: ShowaddressComponent,
  },
  {
    path: 'addaddress',
    component: AddaddressComponent,
  },
  {
    path: 'editaddress',
    component: EditaddressComponent,
  },
  {
    path: 'taxaddress',
    component: ShowTaxAddressComponent,
  },
  {
    path: 'addtaxaddress',
    component: AddTaxAddressComponent,
  },
  {
    path: 'edittaxaddress',
    component: EditTaxAddressComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'promotion',
    component: ShowPromotionComponent,
  },
  {
    path: 'addPromotion',
    component: AddPromotionComponent,
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
  },
  {
    path: 'forgotmail',
    component: RequestResetComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
