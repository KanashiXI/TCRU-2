import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/shared/service/jarwis.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.jarwish.sendPasswordResetLink(this.form).subscribe(
      data => {
        this.handleResponse(data);
        Swal.fire({
          icon: 'success',
          title: 'ส่งอีเมล์สำเร็จ<br>กรุณาตรวจสอบอีเมล์',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigateByUrl('/');
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }
      
    );
  }

  handleResponse(res) {
    console.log(res);
    this.form.email = null;
  }


}
