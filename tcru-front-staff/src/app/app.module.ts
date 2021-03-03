import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { Uniquematerial_nameValidatorDirective } from 'src/app/Service/unique-material-name-validator.directive';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
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
import { AddstockComponent } from './stockm/addstock/addstock.component';
import { AddmComponent } from './material/addm/addm.component';
import { ShowmaterialComponent } from './material/showmaterial/showmaterial.component';
import { EditmComponent } from './material/editm/editm.component';
import { AddpComponent } from './product/addp/addp.component';
import { ShowpComponent } from './product/showp/showp.component';
import { EditpComponent } from './product/editp/editp.component';
import { DialogCustomerComponent } from './TCRU/dialog-customer/dialog-customer.component';
import { PurchaseOrderComponent } from './OrderMaterials/purchase-order/purchase-order.component';
import { ShowOrderMaterialsComponent } from './OrderMaterials/show-order-materials/show-order-materials.component';
import { EditStatusMaterialsComponent } from './OrderMaterials/edit-status-materials/edit-status-materials.component';

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
    path: 'showOrderMaterials',
    component: ShowOrderMaterialsComponent
  },
  {
    path: 'addOrderMaterials',
    component: PurchaseOrderComponent
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
    PurchaseOrderComponent,
    ShowOrderMaterialsComponent,
    EditStatusMaterialsComponent
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
    NgxSpinnerModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    ToggleSidebarComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
