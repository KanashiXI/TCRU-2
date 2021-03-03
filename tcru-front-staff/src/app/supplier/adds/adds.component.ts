import { SupplierService } from 'src/app/service/supplier.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { supplier } from 'src/app/models/supplier.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {
  form: FormGroup;
  supplier = new supplier();
  files: any;
  dataArr: any;
  // files: any;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private SupplierService: SupplierService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.createForm();
    this.getData();
  }
  createForm() {
    this.form = this.fb.group({
      // id: ['', [Validators.required]],
      supplier_name: ['', [Validators.required]],
      supplier_surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      store_name: ['', [Validators.required]],
    });
  }
  getData() {
    this.SupplierService.getData().subscribe(res => {
      this.dataArr = res;
    });}
  insertData() {
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      if (this.form.invalid) {
        return;
      } else {
        this.SupplierService.addsupplier(this.supplier).subscribe(res => {
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
  // get id() {
  //   return this.form.get('id')
  // }
  get supplier_name() {
    return this.form.get('supplier_name')
  }
  get supplier_surname() {
    return this.form.get('supplier_surname')
  }
  get phone() {
    return this.form.get('phone')
  }
  get email() {
    return this.form.get('email')
  }
  get address() {
    return this.form.get('address')
  }
  get store_name() {
    return this.form.get('store_name')
  }

}
