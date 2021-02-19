import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './tcrup/home/home.component';
import { AddmComponent } from './material/addm/addm.component';
import { ShowmaterialComponent } from './material/showmaterial/showmaterial.component';
import { EditmComponent } from './material/editm/editm.component';
import { ShowComponent } from './stockm/show/show.component';
import { StockmComponent } from './stockm/stockm.component';
import { RevealmComponent } from './stockm/revealm/revealm.component';
import { UpdatestockmComponent } from './stockm/updatestockm/updatestockm.component';
import { AddmFilterPipe } from './material/addm/addm-filter.pipe';
import { ShowpFilterPipe } from './product/showp/showp-filter.pipe';
import { AddpComponent } from './product/addp/addp.component';
import { ShowpComponent } from './product/showp/showp.component';
import { EditpComponent } from './product/editp/editp.component';
import { PurchaseOrderComponent } from './stockm/purchase-order/purchase-order.component';
import { CustomersService } from './service/customers.service';
import { CustomersComponent } from './tcrup/customers/customers.component';
import { ImportDataComponent } from './tcrup/import-data/import-data.component';
import { EditcComponent } from './tcrup/editc/editc.component';
const appRoutes: Routes = [
  { path: 'addm', component: AddmComponent },
  { path: 'home', component: HomeComponent },
  { path: 'formm', component: ShowmaterialComponent },
  { path: 'editm/:id', component: EditmComponent },
  { path: 'addp', component: AddpComponent},
  { path: 'showp', component: ShowpComponent},
  { path: 'editp/:id', component: EditpComponent},
  { path: 'purchase', component: PurchaseOrderComponent},
  {  path: 'Customers', component: CustomersComponent},
  {  path: 'ImportData', component: ImportDataComponent},
  {  path: 'editc/:id', component: EditcComponent},
  {  path: 'show', component: ShowComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddmComponent,
    ShowmaterialComponent,
    EditmComponent,
    ShowComponent,
    StockmComponent,
    RevealmComponent,
    UpdatestockmComponent,
    AddmFilterPipe,
    ShowpFilterPipe,
    AddpComponent,
    ShowpComponent,
    EditpComponent,
    AddpComponent,
    PurchaseOrderComponent,
    CustomersComponent,
    ImportDataComponent,
    EditcComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes), 
    Ng2SearchPipeModule,
    NgxSpinnerModule, 
    Ng2OrderModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [CustomersService],
  bootstrap: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,

  ]
})
export class AppModule { }
