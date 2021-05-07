import { AddTaxAddressComponent } from './../taxinvoice/addTaxAddress/addTaxAddress.component';
import { AddaddressComponent } from './../addaddress/addaddress.component';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { Subject, Subscription } from 'rxjs';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { EditprofileComponent } from '../editprofile/editprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() dataEmpForm: Emloyeeinterface;
  dataForm: Emloyeeinterface;
  public error = null;
  reactiveForm: FormGroup;
  submitted = false;
  setEmail: String;
  errorMessage: String;
  test: String;
  ShowName_title: String;
  ShowFirstname: String;
  ShowLastname: String;
  ShowTelephone: String;
  panelOpenState = false;
  couponData: Emloyeeinterface[] = [];
  filterCouponData: Emloyeeinterface[] = [];
  shippingPoint:Emloyeeinterface[] = [];
  pointShip: number = 0;
  constructor(

    private customerService: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private Jarwis: JarwisService,
    public dialog: MatDialog,
    private overlay: Overlay

  ) { }

  ngOnInit() {
    this.createForm();
    this.checkCustomer();
    
  }

  getShopPoint(userId) {
    this.customerService.getShopPoint(userId).subscribe( res => {
      this.shippingPoint = res;
      this.pointShip = Number(this.shippingPoint[0].shopping_point)/100;
    })
  }

  onClickSubmit() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(EditprofileComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

  getCoupon(userId){
    this.customerService.getCoupon(userId).subscribe(res => {
      this.couponData = res;
      this.filter(0);
      this.getShopPoint(userId);
    })
    
  }

  filter(index) {
    this.filterCouponData = this.couponData.filter((element) => this.filterByType(element, index));
  }

  filterByType(element, index) {
    if(index == 0){
      return (element.coupon_status == 0)
    }else if(index == 1){
      return (element.coupon_status == 1)
    }
    
  }

  checkCustomer() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
      userId: localStorage.getItem('user_id'),
    }

    this.getCoupon(requestData.userId)
    this.setEmail = requestData.customerUsername;
    this.customerService.getCustomerProfileByEmail(requestData.customerUsername).subscribe(
      res => {
        // console.log(res);
        this.dataForm = res;
        this.reactiveForm.patchValue({
          name_title: this.dataForm[0].name_title,
          firstname: this.dataForm[0].firstname,
          lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
        })
        this.ShowName_title = this.reactiveForm.get('name_title').value
        this.ShowFirstname = this.reactiveForm.get('firstname').value
        this.ShowLastname = this.reactiveForm.get('lastname').value
        this.ShowTelephone = this.reactiveForm.get('telephone').value
      },
      error => this.errorMessage = <any>error
    )
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      name_title: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
    })

  }

  openDialogAddress() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(AddaddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

  openDialogTax() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(AddTaxAddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

  get lastname() {
    return this.reactiveForm.get('lastname')
  }
  get name_title() {
    return this.reactiveForm.get('name_title')
  }
  get firstname() {
    return this.reactiveForm.get('firstname')
  }
  get telephone() {
    return this.reactiveForm.get('telephone')
  }

}
