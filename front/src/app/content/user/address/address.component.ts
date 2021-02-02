import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Address } from './interfaces/address';
import { Amphure } from './interfaces/amphure';
import { District } from './interfaces/district';
import { Province } from './interfaces/province';
import { AddressService } from './services/address.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
/////// insert Address
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  // message: string;

  errorMessage: String;
  submitted = false;

  shippingAddress: Address;

  provinceArr: Province[] = [];
  aumphureArr: Amphure[] = [];
  districtArr: District[] = [];

  provinceValue: number;
  aumphureValue: number;
  districtValue: number;
  geographieValue: number;
  dataForm: Emloyeeinterface;

  reactiveForm: FormGroup;
  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    // this.addressService.sharedMessage.subscribe(message =>
    //   this.message = message
    // ) 
    ///สำหรับย้ายไปทำ component edit <-- ย้ายแล้ว
    this.getPro();
    this.createForm();
    this.checkCustomer();
  }
  // receiveMessage($event) {
  //   this.message = $event
  // }

  checkCustomer() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
    this.customerService.getCustomerProfileByEmail(requestData.customerUsername).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          // name_title: this.dataForm[0].name_title,
          firstname: this.dataForm[0].firstname,
          lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
          user_id: this.dataForm[0].id,
          // postal_code: this.dataForm[0].postal_code,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      address: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      province_id: ['', [Validators.required]],
      amphures_id: ['', [Validators.required]],
      districts_id: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      geographic_id: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['',],


    })
  }

  onClickSubmit() {

    // this.submitted = true;
    // if (this.reactiveForm.invalid) {
    //   return;
    // } else {
    this.addressService.insertAddress(this.reactiveForm.getRawValue()).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'บันทึกที่อยู่จัดส่งเรียบร้อย',
      showConfirmButton: false,
      timer: 2000
    });
    // }

  }

  getPro() {
    this.addressService.getProvince().subscribe(
      res => {
        this.provinceArr = res;
      })
  }

  getAumph(event) {
    var obj = {
      id: event.target.value,
      geography_id: event.target.value
    }
    this.provinceValue = obj.id;
    this.geographieValue = obj.geography_id;
    this.reactiveForm.patchValue({   // set จังหวัด,ภาค ใน form สำหรับ insert 
      province_id: this.provinceValue,
      geographic_id: this.geographieValue,
    })
    this.addressService.getAumphure(obj).subscribe(res => {
      this.aumphureArr = res;
    });
  }

  getDistr(event) {
    var obj = {
      id: event.target.value
    }
    this.aumphureValue = obj.id;
    this.reactiveForm.patchValue({   // set aumphureใน form สำหรับ insert 
      amphures_id: this.aumphureValue,
    });
    this.addressService.getDistrict(obj).subscribe(res => {
      this.districtArr = res;
    });
  }

  getLast(event) {
    var obj = {
      id: event.target.value
    }
    this.districtValue = obj.id;
    this.reactiveForm.patchValue({   // set districtใน form สำหรับ insert 
      districts_id: this.districtValue,
    });
  }

  get firstname() {
    return this.reactiveForm.get('firstname')
  }
  get lastname() {
    return this.reactiveForm.get('lastname')
  }
  get telephone() {
    return this.reactiveForm.get('telephone')
  }
  get address() {
    return this.reactiveForm.get('address')
  }
  get postal_code() {
    return this.reactiveForm.get('postal_code')
  }




}
