import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/shared/service/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(
    private jarwish: JarwisService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.jarwish.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),

    );
  }

  handleResponse(res) {
    console.log(res);
    this.form.email = null;
  }


}
