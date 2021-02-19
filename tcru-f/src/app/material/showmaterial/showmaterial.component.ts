import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeterialserviceService } from 'src/app/service/meterialservice.service';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-showmaterial',
  templateUrl: './showmaterial.component.html',
  styleUrls: ['./showmaterial.component.css']
})
export class ShowmaterialComponent implements OnInit {

  dataArr: any;
  files: any;
  id: any;
  Materials=new Material();
  date: any;
  categoryArr:any;
  page:any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  constructor(private fb: FormBuilder, 
              private http: HttpClient, private toastr: ToastrService,
              private MeterialService: MeterialserviceService,
              private route:ActivatedRoute,
              private spinner: NgxSpinnerService,) { }


  ngOnInit(): void {
    this.getMeterial();
    this.getcategory();
  }

//   getMeterial(event){
//     var obj = {
//       category_id: event.target.value
//     }
//     this.MeterialService.getData1(obj).subscribe((res:any)=>{
//       this.spinner.hide();
//       this.dataArr=res.data;
//     });
// }

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


  insertData(){
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      let formdata = new FormData();
     formdata.append("file",this.files,this.files.name);
     formdata.append("data",JSON.stringify(this.Materials));
    this.MeterialService.addMaterialtData(formdata).subscribe(res=>{
      this.getMeterial();
      this.toastr.success('เพิ่มข้อมูลวัตถุดิบสำเร็จ!');
    }
    ,
    err => {
    this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
    console.log(err);
    });

  }
  }

  getcategory() {
    this.MeterialService.getcategory().subscribe(res=>{
           this.categoryArr = res;
    })
  }

  imageUpload(event){
    this.files = event.target.files[0];
    console.log(this.files)
 }

}