import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../Service/jarwis.service';
import { TokenService } from '../../Service/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Admin } from '../../Models/admin.model';
import { AdminService } from '../../Service/admin.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminInterface } from '../../interfaces/admin'

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

  loginForm: FormGroup;
  submitted = false;
  isUserNull = false;
  dataForm: Admin;
  setPrle: string;
  
  constructor(
    private admin: AdminService,
    private fb: FormBuilder,
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  usernameFormControl = new FormControl('',[Validators.required]);

  matcher = new MyErrorStateMatcher();

  createForm()
  {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        role: [],
        id: []
      }
    )
  }

  onClickSubmit()
  {
    this.jarwis.login(this.loginForm.getRawValue()).subscribe(
      (response: Response) => {

        localStorage.setItem("AdminUsername", this.loginForm.get('username').value);
        this.admin.getAdmin(this.loginForm.get('username').value).subscribe(
          res => {
            this.dataForm = res;


            this.loginForm.patchValue({
              role: this.dataForm[0].role,
              id: this.dataForm[0].id,
            })
            // this.setRole

            const a = this.loginForm.get('role').value
            const uid = this.loginForm.get('id').value
            localStorage.setItem("user_id", uid);
            this.handleResponse(response, a);
          }
        )
        this.spinner.show();
        this.toastr.success('เข้าสู่ระบบสำเร็จ'); 
      },

      error => {
        this.handleError(error);
        this.spinner.show();
        this.toastr.success('เข้าสู่ระบบไม่สำเร็จสำเร็จ'); 
      }
    )
  }

  handleError(error)
  {
    this.LoginError = true
    this.error = error.error.error;
  }

  handleResponse(data, role)
  {
    console.log(role)
    if(role != '1')
    {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('');
    }
    else 
    {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('');
    }
  }

  get username(){
    return this.loginForm.get('username')
  }

  get password()
  {
    return this.loginForm.get('password')
  }

}
