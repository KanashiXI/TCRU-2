import { Component, OnInit } from '@angular/core';
import { TaxService } from './../services/tax.service';
import { Tax } from './../interfaces/tax';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-inserttax',
  templateUrl: './inserttax.component.html',
  styleUrls: ['./inserttax.component.css']
})
export class InserttaxComponent implements OnInit {

  dataForm: Emloyeeinterface;
  reactiveForm: FormGroup;
  errorMessage: String;

  constructor(
    private taxService: TaxService,
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getTaxForm(),
      this.createForm()
  }

  createForm() {
    this.reactiveForm = this.fb.group({

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

  getTaxForm() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
    this.customerService.getCustomerProfileByEmail(requestData.customerUsername).subscribe(
      res => {
        this.dataForm = res;
        this.reactiveForm.patchValue({
          firstname: this.dataForm[0].firstname,
          lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
          postal_code: this.dataForm[0].postal_code,
          user_id: this.dataForm[0].id,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  onClickSubmit() {
    this.taxService.addTax(this.reactiveForm.getRawValue()).subscribe();
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
