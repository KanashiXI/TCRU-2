import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Tax } from '../interfaces/tax';
import { TaxService } from './../services/tax.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edittax',
  templateUrl: './edittax.component.html',
  styleUrls: ['./edittax.component.css']
})
export class EdittaxComponent implements OnInit {
  reactiveForm: FormGroup;
  dataForm: Tax;
  errorMessage: String;
  constructor(
    private taxService: TaxService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    const requestData = {
      ...Subject,
      tax_id: localStorage.getItem('local_tax_id'),
    }
    this.createForm(),
      this.getTaxForm(requestData.tax_id)
  }
  getTaxForm(data) {

    this.taxService.getOneTax(data).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          firstname: this.dataForm[0].firstname,
          lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
          postal_code: this.dataForm[0].postal_code,
          user_id: this.dataForm[0].user_id,
          company_name: this.dataForm[0].company_name,
          address: this.dataForm[0].address,
          vat_identification_number: this.dataForm[0].vat_identification_number,
          province_id: this.dataForm[0].province_id,
          amphure_id: this.dataForm[0].amphure_id,
          district_id: this.dataForm[0].district_id,
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
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      vat_identification_number: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      province_id: ['', [Validators.required]],
      amphure_id: ['', [Validators.required]],
      district_id: ['', [Validators.required]],

    })
  }

  onClickSubmit() {
    this.taxService.editTax(this.reactiveForm.getRawValue()).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'บันทึกใบกำกับภาษีเรียบร้อย',
      showConfirmButton: false,
      timer: 2000
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
  get vat_identification_number() {
    return this.reactiveForm.get('vat_identification_number')
  }
  get company_name() {
    return this.reactiveForm.get('company_name')
  }
  get province_id() {
    return this.reactiveForm.get('province_id')
  }
  get amphure_id() {
    return this.reactiveForm.get('amphure_id')
  }
  get district_id() {
    return this.reactiveForm.get('district_id')
  }



}
