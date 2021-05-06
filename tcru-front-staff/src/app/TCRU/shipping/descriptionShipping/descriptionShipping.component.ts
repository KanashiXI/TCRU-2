import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { OrderInterface } from './../../../interfaces/orderInterface';
// import { Usersinterface } from './../../../interfaces/usersInterface';
import { StatusInterface } from './../../../interfaces/statusInterface'
import { ShippingService } from './../../../Service/shippingService.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { PrintAddressComponent } from './../printAddress/printAddress.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-descriptionShipping',
  templateUrl: './descriptionShipping.component.html',
  styleUrls: ['./descriptionShipping.component.scss']
})
export class DescriptionShippingComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;

  dataSource: OrderInterface[];
  dataForm: OrderInterface[];
  // statusArr: StatusInterface[] = [];
  statusArr: OrderInterface[] = [];
  reactiveForm: FormGroup;
  selectedStatus: string;

  order_number: Number;
  shUserfirstname: String;
  shUserlastname: String;
  shShipfirstname: string;
  shShiplastname: string;
  shAddress: string;
  shSubdistrict: string;
  shDistrict: string;
  shProvince: string;
  shPostal_code: string;
  shTelephone: string;
  shStatus: string;
  shStatusName: string;
  shDetail_id: number;
  shSlip: string;

  orderId: string;
  orderPart: OrderInterface[] = [];
  imageDirectoyPath: any = 'http://127.0.0.1:5000/img/';

  selectesStatus: OrderInterface;
  constructor(
    private ShippingService: ShippingService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.createForm();
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }
    // this.order = requestData.order_id;
    this.orderId = requestData.order_id;

    this.createForm();
    this.getEditForm(this.orderId),
      this.getStatus();
    this.getUserSlip();
    this.getSelectedStatus(this.orderId)
  }

  getSelectedStatus(orderId) {
    this.ShippingService.getOneStatus(orderId).subscribe(res => {
      this.selectesStatus = res;
    })
  }

  getEditForm(data) {
    this.ShippingService.getOneShipping(data).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          order_id: this.dataForm[0].order_id,
          userfirstname: this.dataForm[0].userfirstname,
          userlastname: this.dataForm[0].userlastname,
          shipfirstname: this.dataForm[0].shipfirstname,
          shiplastname: this.dataForm[0].shiplastname,
          address: this.dataForm[0].address,
          subdistrict: this.dataForm[0].subdistrict,
          district: this.dataForm[0].district,
          province: this.dataForm[0].province,
          postal_code: this.dataForm[0].postal_code,
          telephone: this.dataForm[0].telephone,
          status: this.dataForm[0].status_id,
          status_name: this.dataForm[0].status_name,
          detail_id: this.dataForm[0].detail_id,
          image: this.dataForm[0].image
        })
        this.order_number = this.reactiveForm.get('order_id').value
        this.shUserfirstname = this.reactiveForm.get('userfirstname').value
        this.shUserlastname = this.reactiveForm.get('userlastname').value
        this.shShipfirstname = this.reactiveForm.get('shipfirstname').value
        this.shShiplastname = this.reactiveForm.get('shiplastname').value
        this.shAddress = this.reactiveForm.get('address').value
        this.shSubdistrict = this.reactiveForm.get('subdistrict').value
        this.shDistrict = this.reactiveForm.get('district').value
        this.shProvince = this.reactiveForm.get('province').value
        this.shPostal_code = this.reactiveForm.get('postal_code').value
        this.shTelephone = this.reactiveForm.get('telephone').value
        this.shStatus = this.reactiveForm.get('status').value
        this.shStatusName = this.reactiveForm.get('status_name').value
        this.shDetail_id = this.reactiveForm.get('detail_id').value
        this.shSlip = this.reactiveForm.get('image').value
      },
      error => this.errorMessage = <any>error
    )

  }

  createForm() {
    this.reactiveForm = this.fb.group({
      order_id: ['',],
      userfirstname: ['',],
      userlastname: ['',],
      shipfirstname: ['',],
      shiplastname: ['',],
      address: ['',],
      subdistrict: ['',],
      district: ['',],
      province: ['',],
      postal_code: ['',],
      telephone: ['',],
      status: ['', [Validators.required]],
      detail_id: ['',],
      image: ['',],
    })
  }

  getStatus() {
    this.ShippingService.getStatus().subscribe(
      res => {
        this.statusArr = res;
      }
    )
  }

  onClickSubmit() {
    this.ShippingService.editStatus(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          // showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('deliveryStatus');
      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          // showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getUserSlip() {
    this.ShippingService.getSlip(this.orderId).subscribe(
      res => {
        this.orderPart = res;
      }
    )
  }

  onPrintAddress(data) {
    this.ShippingService.nextMessage(data);
    localStorage.setItem("order_id", data);
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(PrintAddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }


  get order_id() {
    return this.reactiveForm.get('order_id')
  }
  get userfirstname() {
    return this.reactiveForm.get('userfirstname')
  }
  get userlastname() {
    return this.reactiveForm.get('userlastname')
  }
  get address() {
    return this.reactiveForm.get('address')
  }
  get subdistrict() {
    return this.reactiveForm.get('subdistrict')
  }
  get district() {
    return this.reactiveForm.get('district')
  }
  get province() {
    return this.reactiveForm.get('province')
  }
  get postal_code() {
    return this.reactiveForm.get('postal_code')
  }
  get telephone() {
    return this.reactiveForm.get('telephone')
  }
  get status() {
    return this.reactiveForm.get('status')
  }
  get status_name() {
    return this.reactiveForm.get('status_name')
  }
  get detail_id() {
    return this.reactiveForm.get('detail_id')
  }
  get image() {
    return this.reactiveForm.get('image')
  }
}
