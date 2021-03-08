import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { supplier } from 'src/app/models/supplier.model';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/service/supplier.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  dataArr: any;
  files: any;
  id: any;
  supplier=new supplier();
  date: any;
  categoryArr:any;
  page:any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private toastr: ToastrService,
              private SupplierService: SupplierService,
              private route:ActivatedRoute,
              private spinner: NgxSpinnerService,
              ) { }

              ngOnInit(): void {
                this.getData();
              }
              getData()
              {
                this.SupplierService.getData().subscribe(res=>{
                  this.spinner.hide();
                  this.dataArr=res;
                })
              }
            
              deletesupplier(id){
                if (confirm('คุณต้องการลบหรือไม่ ?') === true)
                this.SupplierService.deletesupplier(id).subscribe(result => {
                  this.getData();
                  this.spinner.show();
                  this.toastr.success('ลบข้อมูลร้านค้าสำเร็จ!'); 
                },
                err => {
                this.toastr.error('ลบล้มข้อมูลร้านค้าล้มเหลว!');
                this.spinner.show();
                console.log(err);
                });
            }   
            }