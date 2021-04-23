import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { Uniquematerial_nameValidatorDirective } from 'src/app/Service/unique-material-name-validator.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { StockComponent } from './stockp/stock/stock.component';
import { ShowlotComponent } from './stockp/showlot/showlot.component';
import { AddlotComponent } from './stockp/addlot/addlot.component';
import { HeaderComponent } from './TCRU/Toolbar/header/header.component';
import { ToggleSidebarComponent } from './TCRU/Toolbar/toggle-sidebar/toggle-sidebar.component';
import { SidebarComponent } from './TCRU/Toolbar/sidebar/sidebar.component';
import { CustomersComponent } from './TCRU/customers/customers.component';
import { ReportComponent } from './TCRU/report/report.component';
import { ShowsComponent } from './supplier/shows/shows.component';
import { AddsComponent } from './supplier/adds/adds.component';
import { EditsComponent } from './supplier/edits/edits.component';
import { AddstockComponent } from './stockm/addstock/addstock.component';
import { AddmComponent } from './material/addm/addm.component';
import { ShowmaterialComponent } from './material/showmaterial/showmaterial.component';
import { EditmComponent } from './material/editm/editm.component';
import { AddpComponent } from './product/addp/addp.component';
import { ShowpComponent } from './product/showp/showp.component';
import { EditpComponent } from './product/editp/editp.component';
import { DialogCustomerComponent } from './TCRU/dialog-customer/dialog-customer.component';
import { ShowPromotionComponent } from './TCRU/promotion/showPromotion/showPromotion.component';
import { AddPromotionComponent } from './TCRU/promotion/addPromotion/addPromotion.component';
import { EditPromotionComponent } from './TCRU/promotion/editPromotion/editPromotion.component';
import { DeliveryStatusComponent } from './TCRU/shipping/deliveryStatus/deliveryStatus.component';
import { DescriptionShippingComponent } from './TCRU/shipping/descriptionShipping/descriptionShipping.component';
import { ShowOrderComponent } from './OrderMaterials/show-order/show-order.component';
import { FormulaComponent } from './TCRU/formula/formula.component';
import { ShowformulaComponent } from './product/showformula/showformula.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgMultiSelectDropDownModule  } from 'ng-multiselect-dropdown';
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddOrderComponent } from './OrderMaterials/add-order/add-order.component';
import { CurrencyPipe } from "@angular/common";

const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: '/Report', 
    pathMatch: 'full'
  },
  {
    path: 'Report',
    component: ReportComponent,
  },
  { 
    path: 'Customers', 
    component: CustomersComponent 
  },
  { 
    path: 'shows', 
    component: ShowsComponent 
  },
  { 
    path: 'adds', 
    component: AddsComponent 
  },
  { 
    path: 'addstock', 
    component: AddstockComponent 
  },
  { 
    path: 'stockp', 
    component: StockComponent 
  },
  { 
    path: 'addm', 
    component: AddmComponent 
  },
  { 
    path: 'formm', 
    component: ShowmaterialComponent 
  },
  { 
    path: 'editm/:id', 
    component: EditmComponent 
  },
  { 
    path: 'addp', 
    component: AddpComponent 
  },
  { 
    path: 'showp', 
    component: ShowpComponent 
  },
  { 
    path: 'editp/:id', 
    component: EditpComponent 
  },
  { 
    path: 'addstm', 
    component: AddstockComponent 
  },
  {
    path: 'promotion',
    component: ShowPromotionComponent
  },
  {
    path: 'addPromotion',
    component: AddPromotionComponent
  },
  {
    path: 'editpromotion',
    component: EditPromotionComponent
  },
  {
    path: 'deliveryStatus',
    component: DeliveryStatusComponent
  },
  {
    path: 'descriptionShipping',
    component: DescriptionShippingComponent
  },
  { 
    path: 'edits/:id', 
    component: EditsComponent 
  },
  { 
    path: 'showlotp/:id', 
    component: ShowlotComponent 
  },
  {
    path: 'showOrderM',
    component: ShowOrderComponent
  },
  {
    path: 'addlotp',
    component: AddlotComponent
  },
  {
    path: 'formula',
    component: FormulaComponent
  },
  {
    path: 'showformula/:id',
    component: ShowformulaComponent
  },
  {
    path: 'addOrder',
    component: AddOrderComponent
  }  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ToggleSidebarComponent,
    CustomersComponent,
    ReportComponent,
    ShowsComponent,
    AddsComponent,
    AddstockComponent,
    AddmComponent,
    ShowmaterialComponent,
    EditmComponent,
    ShowpComponent,
    EditpComponent,
    AddpComponent,
    Uniquematerial_nameValidatorDirective,
    AddstockComponent,
    StockComponent,
    ShowlotComponent,
    AddlotComponent,
    DialogCustomerComponent,
    ShowPromotionComponent,
    AddPromotionComponent,
    EditPromotionComponent,
    DeliveryStatusComponent,
    DescriptionShippingComponent,
    EditsComponent,
    ShowOrderComponent,
    AddOrderComponent,
    FormulaComponent,
    ShowformulaComponent
  ],
  entryComponents:[DialogCustomerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatMenuModule,
    OverlayModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    Ng2OrderModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    // QRCodeModule,
    IonicModule.forRoot(),
    NgxQRCodeModule,
    // BarcodeScanner, 
    Ng2SearchPipeModule,
    // NgMultiSelectDropDownModule.forRoot(),
    // NgxDatePickerModule,
    // NgSelectModule
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    ToggleSidebarComponent,
    SidebarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class AppModule { }
