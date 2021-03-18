import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;
  LoginError = false;

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
  ) { }

  ngOnInit() {
    this.createForm();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  createForm() {
    this.reactiveForm = this.fb.group({
      // username: ['', null, uniqueUsernameValidator(this.customerService), [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
          title: 'เข้าสู่ระบบไม่สำเร็จ<br>โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน',
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
      this.router.navigateByUrl('');
    }
  }

  get email() {
    return this.reactiveForm.get('email')
  }
  get password() {
    return this.reactiveForm.get('password')
  }


}
