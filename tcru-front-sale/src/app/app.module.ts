import { MaterialModule } from './material/material.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [JarwisService, TokenService, AuthService, AfterLoginService, BeforeLoginService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
