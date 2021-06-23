import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { compareValidator } from 'src/app/shared/service/compare-validator.directive';
import { uniqueEmailValidator } from './../../../shared/service/unique-email-validator.directive';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reactiveForm: FormGroup;
  roleForm: FormGroup;
  submitted = false;
  dataForm: Emloyeeinterface;

  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public error = [];


  createForm() {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], uniqueEmailValidator(this.customerService)],
      name: ['user'],
      name_title: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, compareValidator('password'), Validators.maxLength(16)]],
      telephone: ['', [Validators.required]],
      id: [],
      role: []
    })
    this.roleForm = this.fb.group({
      // role: [1],
      id: []
    })

  }


  onClickRegis() {

    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    } else {
      // const customer = this.reactiveForm.getRawValue();
      // this.customerService.postCustomer(customer).subscribe();
      this.Jarwis.signup(this.reactiveForm.getRawValue()).subscribe(
        data => {
          this.handleResponse(data),
            Swal.fire({
              icon: 'success',
              title: 'ลงทะเบียนเสร็จสิ้้น',
              showConfirmButton: false,
              timer: 2000
            });


        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'ลงทะเบียนไม่สำเร็จ',
            showConfirmButton: false,
            timer: 2000
          });
        }
        // error => this.handleError(error)
      );
    }
    // console.log(this.reactiveForm.get('telephone').value)

  }

  handleResponse(data) {
    // localStorage.setItem("customerUsername", this.reactiveForm.get('email').value);
    this.Token.handle(data.access_token);
    this.customerService.getCustomerProfileByEmail(this.reactiveForm.get('email').value).subscribe(
      res => {
        this.dataForm = res;
        // this.roleForm.patchValue({
        //   id: this.dataForm[0].id,
        // })
        this.handleLogin()
      }
    )
  }

  handleLogin() {
    this.Jarwis.login(this.reactiveForm.getRawValue()).subscribe(
      (response: Response) => {
        this.customerService.getCustomerProfileByEmail(this.reactiveForm.get('email').value).subscribe(
          res => {
            this.dataForm = res;
            const uid = res[0].id.toString()
            const uemail = res[0].email.toString()
            localStorage.setItem("user_id", uid);
            localStorage.setItem("customerUsername", uemail);
            this.roleForm.patchValue({
              role: this.dataForm[0].role,
              id: this.dataForm[0].id,
            })
          })
        const a = this.reactiveForm.get('role').value


        this.handleResponselogin(response, a);

      });
  }

  handleResponselogin(data, role) {
    console.log(role)
    if (role != '1') {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('');
      this.cartService.changeCount();
    } else {
      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('');
    }
  }

  get name_title() {
    return this.reactiveForm.get('name_title')
  }
  get lastname() {
    return this.reactiveForm.get('lastname')
  }
  get firstname() {
    return this.reactiveForm.get('firstname')
  }
  // get username() {
  //   return this.reactiveForm.get('username')
  // }
  get email() {
    return this.reactiveForm.get('email')
  }
  // get emailConfirm() {
  //   return this.reactiveForm.get('emailConfirm')
  // }
  get password() {
    return this.reactiveForm.get('password')
  }
  get password_confirmation() {
    return this.reactiveForm.get('password_confirmation')
  }
  get telephone() {
    return this.reactiveForm.get('telephone')
  }

}
