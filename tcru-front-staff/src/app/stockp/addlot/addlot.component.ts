import { LotpService } from 'src/app/service/lotp.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lotp } from 'src/app/models/lotp.model';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-addlot',
  templateUrl: './addlot.component.html',
  styleUrls: ['./addlot.component.css']
})
export class AddlotComponent implements OnInit {
  form: FormGroup;
  lotp = new lotp();
  files: any;
  dataArr: any;
  categoryArr: any;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private LotpService: LotpService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getproduct();
    this.getData();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      product_id: ['', [Validators.required]],
      lastnamee: ['', [Validators.required]],
      firstnamee: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      MFG: ['', [Validators.required]],
      EXP: ['', [Validators.required]],
    });
  }
  getData() {
    this.LotpService.getData().subscribe(res => {
      this.dataArr = res;
    });}
    getproduct() {
      this.LotpService.getproduct().subscribe(res => {
        this.categoryArr = res;
      })
    }
  insertData() {
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      if (this.form.invalid) {
        return;
      } else {
        this.LotpService.addlotp(this.lotp).subscribe(res => {
          this.getData();
          // this.toastr.success('เพิ่มข้อมูลวัตถุดิบสำเร็จ!');
        }
          ,
          err => {
            // this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
            console.log(err);
          });
      }

    }
  }
  get id() {
    return this.form.get('id')
  }
  get product_id() {
    return this.form.get('product_id')
  }
  get firstnamee() {
    return this.form.get('firstnamee')
  }
  get lastnamee() {
    return this.form.get('lastnamee')
  }
  get quantity() {
    return this.form.get('quantity')
  }
  get MFG() {
    return this.form.get('MFG')
  }
  get EXP() {
    return this.form.get('EXP')
  }

}
