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

const routes: Routes = [
  {
    path: '',
    component: ShopviewComponent,
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
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
