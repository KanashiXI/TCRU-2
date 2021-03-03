import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Tax } from '../interfaces/tax';
import { TaxService } from './../services/tax.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AddressService } from '../../addaddress/services/address.service';
import { Amphure } from '../../addaddress/interfaces/amphure';
import { District } from '../../addaddress/interfaces/district';
import { Province } from '../../addaddress/interfaces/province';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editTaxAddress',
  templateUrl: './editTaxAddress.component.html',
  styleUrls: ['./editTaxAddress.component.css']
})
export class EditTaxAddressComponent implements OnInit {

  reactiveForm: FormGroup;
  dataForm: Tax;
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
    private addressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      tax_id: localStorage.getItem('local_tax_id'),
    }
    this.createForm(),
    this.getTaxForm(requestData.tax_id),
    this.getPro();
  }

  getTaxForm(data) {

    this.taxService.getOneTax(data).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          // firstname: this.dataForm[0].firstname,
          // lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
          postal_code: this.dataForm[0].postal_code,
          user_id: this.dataForm[0].user_id,
          company_name: this.dataForm[0].company_name,
          address: this.dataForm[0].address,
          vat_identification_number: this.dataForm[0].vat_identification_number,
          province_id: this.dataForm[0].province_id,
          amphures_id: this.dataForm[0].amphures_id,
          districts_id: this.dataForm[0].districts_id,
          tax_id: this.dataForm[0].tax_id,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      tax_id: ['',],
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

    })
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

  onClickSubmit() {
    this.taxService.editTax(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('profile');
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
  get province_id() {
    return this.reactiveForm.get('province_id')
  }
  get amphures_id() {
    return this.reactiveForm.get('amphures_id')
  }
  get districts_id() {
    return this.reactiveForm.get('districts_id')
  }


}
