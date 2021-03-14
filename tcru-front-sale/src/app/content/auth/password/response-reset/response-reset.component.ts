import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/shared/service/jarwis.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  constructor(
    private route: ActivatedRoute,
    private jarwish: JarwisService,
    private router: Router,
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.jarwish.changePassword(this.form).subscribe(
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

}
