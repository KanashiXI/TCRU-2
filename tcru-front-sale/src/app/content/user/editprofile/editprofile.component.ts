import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JarwisService } from 'src/app/shared/service/jarwis.service';

interface Title {
  id: number;
  name: string;
}

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})

export class EditprofileComponent implements OnInit {

  @Input() dataEmpForm: Emloyeeinterface;
  dataForm: Emloyeeinterface;
  // employeeData: Subject<Emloyeeinterface[]> = this.getCustomerData();
  public error = null;
  reactiveForm: FormGroup;
  submitted = false;
  // subscription = new Subscription();
  setEmail: String;
  errorMessage: String;
  test: String;
  // emp: Emloyeeinterface[];
  ShowEmail: String;

  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private Jarwis: JarwisService,
    private router: Router,
  ) { }

  ngOnInit() {
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
        this.dataForm = res;
        this.reactiveForm.patchValue({
          name_title: this.dataForm[0].name_title,
          firstname: this.dataForm[0].firstname,
          lastname: this.dataForm[0].lastname,
          telephone: this.dataForm[0].telephone,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  createForm() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
    this.reactiveForm = this.fb.group({

      name_title: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      telephone: ['', [Validators.required],],
      email: [this.setEmail = requestData.customerUsername],

    })
  }

  titleControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  titles: Title[] = [
    {id:1, name: 'นาย'},
    {id:2, name: 'นาง'},
    {id:3, name: 'นางสาว'},
  ];

  get name_title() {
    return this.reactiveForm.get('name_title')
  }
  get lastname() {
    return this.reactiveForm.get('lastname')
  }
  get firstname() {
    return this.reactiveForm.get('firstname')
  }
  get telephone() {
    return this.reactiveForm.get('telephone')
  }
  
  async onClickSubmit() {

    this.submitted = true;
    // if (this.reactiveForm.invalid) {
    //   return;
    // } else {
    await this.Jarwis.editProfile(this.reactiveForm.getRawValue()).subscribe();
    await this.router.navigate(['/profile'])
    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย',
      showConfirmButton: false,
      timer: 2000
    });
    // }

  }

}
