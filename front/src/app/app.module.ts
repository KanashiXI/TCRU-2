import { EditprofileComponent } from './content/user/editprofile/editprofile.component';
import { AddReduceComponent } from './content/shop/productDetail/addReduce/addReduce.component';
// import { CartComponent } from './content/dealing/cart/cart.component';
import { ProductDetailComponent } from './content/shop/productDetail/productDetail.component';
import { ProductInfoComponent } from './content/shop/productInfo/productInfo.component';
import { PleaseCheckMailComponent } from './content/auth/pleaseCheckMail/pleaseCheckMail.component';
import { ResetPasswordComponent } from './content/auth/resetPassword/resetPassword.component';
import { LoginComponent } from './content/auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowempComponent } from './content/showemp/showemp.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ProductviewComponent } from './content/shop/productview/productview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { UniqueUsernameValidatorDirective } from './shared/service/unique-username-validator.directive';
import { CommonModule } from '@angular/common';
import { CompareValidatorDirective } from './shared/service/compare-validator.directive';
import { UniqueEmailValidatorDirective } from './shared/service/unique-email-validator.directive';
import { MenubarComponent } from './content/decorate/menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { FooterComponent } from './content/decorate/footer/footer.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ProfileComponent } from './content/user/profile/profile.component';
import { SigninComponent } from './content/auth/signin/signin.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { JarwisService } from './shared/service/jarwis.service';
import { TokenService } from './shared/service/token.service';
import { AuthService } from './shared/service/auth.service';
import { AfterLoginService } from './shared/service/after-login.service';
import { BeforeLoginService } from './shared/service/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ShippingComponent } from './content/dealing/shipping/shipping.component';
import { CouponComponent } from './content/dealing/discount/coupon/coupon.component';
import { DividerModule } from 'primeng/divider';
import { TaxinvoiceComponent } from './content/user/taxinvoice/taxinvoice.component';
import { AddressComponent } from './content/user/address/address.component';
import { ShowaddressComponent } from './content/user/showaddress/showaddress.component';
import { EditaddressComponent } from './content/user/editaddress/editaddress.component';
import { ShowtaxComponent } from './content/user/taxinvoice/showtax/showtax.component';
import { InserttaxComponent } from './content/user/taxinvoice/inserttax/inserttax.component';
import { EdittaxComponent } from './content/user/taxinvoice/edittax/edittax.component';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';

import { CartComponent } from './content/shop/cart/cart/cart.component';
import { StockComponent } from './content/management/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    RegisterComponent,
    ShowempComponent,
    ProductviewComponent,
    UniqueUsernameValidatorDirective,
    CompareValidatorDirective,
    UniqueEmailValidatorDirective,
    MenubarComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    SigninComponent,
    ResetPasswordComponent,
    PleaseCheckMailComponent,
    ProductInfoComponent,
    ProductDetailComponent,
    ShippingComponent,
    CouponComponent,
    CartComponent,
    AddReduceComponent,
    TaxinvoiceComponent,
    AddressComponent,
    ShowaddressComponent,
    EditaddressComponent,
    ShowtaxComponent,
    InserttaxComponent,
    EdittaxComponent,
    EditprofileComponent,
    StockComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MessagesModule,
    MessageModule,
    CommonModule,
    MenubarModule,
    MenuModule,
    MegaMenuModule,
    CommonModule,
    DialogModule,
    PanelMenuModule,
    CardModule,
    TabMenuModule,
    TabViewModule,
    DropdownModule,
    FieldsetModule,
    BreadcrumbModule,
    DividerModule,
    DataViewModule,
    PanelModule,
  ],
  providers: [JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
