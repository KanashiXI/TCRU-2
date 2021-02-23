import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Address } from './interfaces/address';
import { Amphure } from './interfaces/amphure';
import { District } from './interfaces/district';
import { Province } from './interfaces/province';
import { AddressService } from './services/address.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.scss']
})
export class AddaddressComponent implements OnInit {

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

  ngOnInit( ) {    
    this.getPro();
    this.createForm();
    this.checkCustomer();
  }

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
          province_id: this.dataForm[0].name_th,
          amphures_id: this.dataForm[0].name_th,
          district: this.dataForm[0].name_th,
          postal_code: this.dataForm[0].postal_code,
          // jwefoifoie:this.dataForm[0].postal_code,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      address: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      province_id: ['', Validators.compose([Validators.required])],
      amphures_id: ['', [Validators.required]],
      districts_id: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      geographic_id: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['',[Validators.required]],
    })
  }

  onClickSubmit() {

    // this.submitted = true;
    // if (this.reactiveForm.invalid) {
    //   return;
    // } else {
    this.addressService.insertAddress(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });

      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
    // Swal.fire({
    //   icon: 'success',
    //   title: 'บันทึกที่อยู่จัดส่งเรียบร้อย',
    //   showConfirmButton: false,
    //   timer: 2000
    // });

  }

  getPro() {
    this.addressService.getProvince().subscribe(
      res => {
        this.provinceArr = res;
      })
  }

  getAumph(event) {
    var obj = {
      id: event.value,
      geography_id: event.value
    }
    // console.log(event.value)
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
      id: event.value
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
      id: event.value
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
  get province() {
    return this.reactiveForm.get('province')
  }
  get district() {
    return this.reactiveForm.get('district')
  }
  get sub_district() {
    return this.reactiveForm.get('sub_district')
  }
  get postal_code() {
    return this.reactiveForm.get('postal_code')
  }

}
