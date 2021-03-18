import { MaterialModule } from './material/material.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfterLoginService } from './shared/service/after-login.service';
import { BeforeLoginService } from './shared/service/before-login.service';
import { AuthService } from './shared/service/auth.service';
import { TokenService } from './shared/service/token.service';
import { JarwisService } from './shared/service/jarwis.service';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { MenubarComponent } from './content/decorate/menubar/menubar.component';
import { FooterComponent } from './content/decorate/footer/footer.component';
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
import { ConfirmDialogComponent } from './content/decorate/confirm-dialog/confirm-dialog.component';
import { RequestResetComponent } from './content/auth/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './content/auth/password/response-reset/response-reset.component';
import { SkeletonLoaderComponent } from './content/decorate/skeleton-loading/skeleton-loder/skeleton-loader.component';
// import { BreadcrumbModule } from 'angular-crumbs';
@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    FooterComponent,
    ShopviewComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditprofileComponent,
    ShowaddressComponent,
    AddaddressComponent,
    EditaddressComponent,
    ShowTaxAddressComponent,
    AddTaxAddressComponent,
    EditTaxAddressComponent,
    CartComponent,
    ShowPromotionComponent,
    AddPromotionComponent,
    ConfirmDialogComponent,
    RequestResetComponent,
    ResponseResetComponent,
    SkeletonLoaderComponent,
  ],
  entryComponents: [ProductDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
<<<<<<< HEAD

=======
    // BreadcrumbModule
>>>>>>> f480f628c1ad0c5b424c3300fe823c0f29b4129e
  ],
  providers: [
    JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService
    , { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
