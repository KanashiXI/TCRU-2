
import { HttpClient } from '@angular/common/http';
import { Materialinterface } from '../../interface/materialinterface';
import { MeterialserviceService } from '../../service/meterialservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
// import { reverse } from 'dns';

@Component({
  selector: 'app-addm',
  templateUrl: './addm.component.html',
  styleUrls: ['./addm.component.css']
})
export class AddmComponent {

  materialList: any[]=[];
  imageDirectoyPath:any = 'http://127.0.0.1:5000/public/image/';
  material_id: string;
  Search: string;
  materialMessage: string;
  dataArr: any;
  material_name:any;
  page:any = 1;
  limit: any = 5;
  skip: any;
  categoryArr:any;
  totalCount: any;
  constructor(private http: HttpClient,
    private MeterialService: MeterialserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) {

  }
  ngOnInit(): void {
    this.getMeterial();
  }
  getMeterial()
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
    this.MeterialService.getData1(requestObj).subscribe((res:any)=>{
      this.spinner.hide();
      this.dataArr=res.data;
      this.totalCount = res.totalRecord;
    })
  }

  deleteMaterial(id){
    if (confirm('คุณต้องการลบหรือไม่ ?') === true)
    this.MeterialService.deleteMaterial(id).subscribe(result => {
      this.getMeterial();
      this.spinner.show();
      this.toastr.success('ลบข้อมูลวัตถุดิบสำเร็จ!'); 
    },
    err => {
    this.toastr.error('ลบล้มข้อมูลวัตถุดิบเหลว!');
    this.spinner.show();
    console.log(err);
    });
}

// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }


}
  
