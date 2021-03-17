import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import { compareValidator } from 'src/app/shared/service/compare-validator.directive';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  reactiveForm: FormGroup;
  // public form = {
  //   email: new FormControl('', [Validators.required, Validators.email,]),
  //   password: new FormControl('', Validators.required),
  //   password_confirmation: new FormControl('', [Validators.required, compareValidator('password')]),
  //   resetToken: null
  // };
  createForm(token) {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, compareValidator('password')]],
      resetToken: [],

    })

    this.reactiveForm.patchValue({
      resetToken: token,

    })
  }

  constructor(
    private route: ActivatedRoute,
    private jarwish: JarwisService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    route.queryParams.subscribe(params => {
      const token = params['token'];
      
      this.createForm(token)
    });
    
  }
  
  onSubmit() {
    this.jarwish.changePassword(this.reactiveForm.getRawValue()).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    console.log('success to reset !!!')
    // let _router = this.router;
    // this.Notify.confirm('Done !, Now login with new password ',{
    // 	buttons:[
    // 		{text: 'Okay',
    // 		 action: toaster => {
    // 			 _router.navigateByUrl('/login'),
    // 			 this.Notify.remove(toaster.id)
    // 		 } 
    // 		}
    // 	]
    // })

  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit(): void {
    
  }

  get email() {
    return this.reactiveForm.get('email')
  }
  get password() {
    return this.reactiveForm.get('password')
  }

  get password_confirmation() {
    return this.reactiveForm.get('password_confirmation')
  }
}
