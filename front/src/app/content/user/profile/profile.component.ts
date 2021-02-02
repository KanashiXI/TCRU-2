import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { MenuItem, SelectItem } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { RadioButtonModule } from 'primeng/radiobutton';
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
  provinve: SelectItem[];
  setEmail: String;
  errorMessage: String;
  test: String;
  ShowName_title: String
  ShowFirstname: String
  ShowLastname: String
  ShowTelephone: String
  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private Jarwis: JarwisService,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.checkCustomer();
  }

  checkCustomer() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
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
          // address: this.dataForm[0].address,
          // province: this.dataForm[0].province,
          // district: this.dataForm[0].district,
          // sub_district: this.dataForm[0].sub_district,
          // postal_code: this.dataForm[0].postal_code,
          // email: this.setEmail
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
  get province() {
    return this.reactiveForm.get('province')
  }
  get district() {
    return this.reactiveForm.get('district')
  }
  get sub_district() {
    return this.reactiveForm.get('sub_district')
  }
  get postalCode() {
    return this.reactiveForm.get('postal_code')
  }

  onClickSubmit() {

    // this.submitted = true;
    // if (this.reactiveForm.invalid) {
    //   return;
    // } else {
    //   this.Jarwis.editProfile(this.reactiveForm.getRawValue()).subscribe();
    // }

  }




}
