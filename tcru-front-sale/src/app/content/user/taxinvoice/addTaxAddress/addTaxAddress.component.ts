import { Component, OnInit } from '@angular/core';
import { TaxService } from './../services/tax.service';
import { Tax } from './../interfaces/tax';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddressService } from '../../addaddress/services/address.service';
import { Address } from '../../addaddress/interfaces/address';
import { Amphure } from '../../addaddress/interfaces/amphure';
import { District } from '../../addaddress/interfaces/district';
import { Province } from '../../addaddress/interfaces/province';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addTaxAddress',
  templateUrl: './addTaxAddress.component.html',
  styleUrls: ['./addTaxAddress.component.css']
})
export class AddTaxAddressComponent implements OnInit {

  dataForm: Emloyeeinterface;
  reactiveForm: FormGroup;
  errorMessage: String;


  provinceArr: Province[] = [];
  aumphureArr: Amphure[] = [];
  districtArr: District[] = [];

  provinceValue: number;
  aumphureValue: number;
  districtValue: number;
  geographieValue: number;

  constructor(
    private taxService: TaxService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private addressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTaxForm(),
      this.createForm(),
      this.getPro();
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      user_id: ['',],
      address: ['', [Validators.required]],
      // firstname: ['', [Validators.required]],
      // lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      vat_identification_number: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      province_id: ['', [Validators.required]],
      amphures_id: ['', [Validators.required]],
      districts_id: ['', [Validators.required]],
      geographic_id: ['', [Validators.required]]


    })
  }

  getTaxForm() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
    this.customerService.getCustomerProfileByEmail(requestData.customerUsername).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          // firstname: this.dataForm[0].firstname,
          // lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
          postal_code: this.dataForm[0].postal_code,
          user_id: this.dataForm[0].id,
          province_id: this.dataForm[0].name_th,
          amphures_id: this.dataForm[0].name_th,
          district: this.dataForm[0].name_th,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  getPro() {
    this.addressService.getProvince().subscribe(
      res => {
        this.provinceArr = res;
        this.provinceArr.sort((a, b) => a.name_th.localeCompare(b.name_th));
      })
  }

  getAumph(event) {
    var obj = {
      id: event.value,
      geography_id: event.value
    }
    this.provinceValue = obj.id;
    this.geographieValue = obj.geography_id;
    this.reactiveForm.patchValue({   // set จังหวัด,ภาค ใน form สำหรับ insert 
      province_id: this.provinceValue,
      geographic_id: this.geographieValue,
    })
    this.addressService.getAumphure(obj).subscribe(res => {
      this.aumphureArr = res;
      this.aumphureArr.sort((a, b) => a.name_th.localeCompare(b.name_th));
    });
  }
  onclickRe() {
    this.ngOnInit();
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
      this.districtArr.sort((a, b) => a.name_th.localeCompare(b.name_th));
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

  onClickSubmit() {
    this.taxService.addTax(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        // this.router.navigateByUrl('profile');

      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }


    )



    // Swal.fire({
    //   icon: 'success',
    //   title: 'บันทึกใบกำกับภาษีเรียบร้อย',
    //   showConfirmButton: false,
    //   timer: 2000
    // });
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
  get vat_identification_number() {
    return this.reactiveForm.get('vat_identification_number')
  }
  get company_name() {
    return this.reactiveForm.get('company_name')
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

}
