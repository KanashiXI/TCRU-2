import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { compareValidator } from 'src/app/shared/service/compare-validator.directive';
// import { resolve } from 'dns';
import { uniqueUsernameValidator } from 'src/app/shared/service/unique-username-validator.directive';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
// import { MessageService } from 'primeng/api/primeng-api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public form = {
  //   email: null,
  //   password: null
  // };
  public error = null;
  LoginError = false;

  // private duplicateEmailDbounce;
  reactiveForm: FormGroup;
  submitted = false;
  isUserNull = false;
  dataForm: Emloyeeinterface;
  setRole: string;
  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    // private messageService: MessageService,
  ) {

  }
  ngOnInit() {
    // this.customerService.getCustomer().subscribe()

    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      // username: ['', null, uniqueUsernameValidator(this.customerService), [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      // role_id: [2, [Validators.required]],
      role: [],
      id: [],

    })
  }

  onClickSubmit() {
    this.Jarwis.login(this.reactiveForm.getRawValue()).subscribe(
      (response: Response) => {

        localStorage.setItem("customerUsername", this.reactiveForm.get('email').value);
        this.customerService.getCustomerProfileByEmail(this.reactiveForm.get('email').value).subscribe(
          res => {
            this.dataForm = res;


            this.reactiveForm.patchValue({
              role: this.dataForm[0].role,
              id: this.dataForm[0].id,
            })
            // this.setRole

            const a = this.reactiveForm.get('role').value
            const uid = this.reactiveForm.get('id').value
            localStorage.setItem("user_id", uid);
            this.handleResponse(response, a);
          }
        )
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });



      },
      error => {
        this.handleError(error);
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
    
  }

  handleError(error) {
    this.LoginError = true
    this.error = error.error.error;
  }

  handleResponse(data, role) {
    console.log(role)
    if (role != '1') {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('');
    } else {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('stock');
    }


    // this.router.navigate(['/profile'])
    // localStorage.setItem("customerUsername","");
  }




  // onClickRegis() {
  //   this.submitted = true;
  //   if (this.reactiveForm.invalid) {
  //     return;
  //   } else {
  //     const customer = this.reactiveForm.getRawValue();
  //     this.customerService.postCustomer(customer).subscribe(
  //     );
  //   }
  // }

  get email() {
    return this.reactiveForm.get('email')
  }
  get password() {
    return this.reactiveForm.get('password')
  }

}
