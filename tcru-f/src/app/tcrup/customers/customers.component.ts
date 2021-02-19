import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  customersList: any[];
  customer_id: string;
  customersMessage: string;
  fileName = 'Customers.xlsx';
  searchText: string;
  term: string;
  filterTerm: string;
  page:any = 1;
  limit: any = 10;
  skip: any;
  categoryArr:any;
  totalCount: any;
  dataArr: any;

  constructor(private http: HttpClient,
    private CustomersService: CustomersService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,) { 
    }

    ngOnInit(): void {
      this.getCustomers();
    }
    getCustomers()
    {
      this.spinner.show();
      if(this.page == 1){
          this.skip = 0;
      } else{
          this.skip = (this.page-1) * this.limit;
      }
      var requestObj = {
             'limit': this.limit,
             'skip':  this.skip
             
      }
      this.CustomersService.getData1(requestObj).subscribe((res:any)=>{
        this.spinner.hide();
        this.dataArr=res.data;
        this.totalCount = res.totalRecord;
      })
    }

    export(): void {
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      XLSX.writeFile(wb, this.fileName);
    }


    deleteCustomers(id){
      if (confirm('คุณต้องการลบหรือไม่ ?') === true)
      this.CustomersService.deleteCustomers(id).subscribe(result => {
        this.getCustomers();
        this.spinner.show();
        this.toastr.success('ลบข้อมูลลูกค้าสำเร็จ!'); 
      },
      err => {
      this.toastr.error('ลบข้อมูลลูกค้าล้มเหลว!');
      this.spinner.show();
      console.log(err);
      });
  }
  // ngOnInit(): void {
  // }

}
