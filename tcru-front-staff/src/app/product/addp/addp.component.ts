import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
// import { ToastrService } from 'ngx-toastr';
import { product } from '../../models/product.model';
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-addp',
  templateUrl: './addp.component.html',
  styleUrls: ['./addp.component.css']
})
export class AddpComponent implements OnInit {

  dataArr: any;
  files: any;
  id: any;
  product=new product();
  date: any;
  categoryArr:any;
  page:any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              // private toastr: ToastrService,
              private ProductService: ProductService,
              private route:ActivatedRoute,
              // private spinner: NgxSpinnerService,
              ) { }


  ngOnInit(): void {
    this.getProduct();
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

  getProduct()
  {
    // this.spinner.show();
    if(this.page == 1){
        this.skip = 0;
    } else{
        this.skip = (this.page-1) * this.limit;
    }
    var requestObj = {
      'limit': this.limit,
      'skip':  this.skip
}

    this.ProductService.getData1(requestObj).subscribe((res:any)=>{
      // this.spinner.hide();
      this.dataArr=res.data;
      this.totalCount = res.totalRecord;
    })
  }


  insertData(){
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      let formdata = new FormData();
     formdata.append("file",this.files,this.files.name);
     formdata.append("data",JSON.stringify(this.product));
    this.ProductService.addProductData(formdata).subscribe(res=>{
      this.getProduct();
      // this.toastr.success('เพิ่มข้อมูลสินค้าสำเร็จ!');
    }
    ,
    err => {
    // this.toastr.error('เพิ่มข้อมูลสินค้าล้มเหลว!');
    console.log(err);
    });

  }
  }

  getcategory() {
    this.ProductService.getcategory().subscribe(res=>{
           this.categoryArr = res;
    })
  }

  imageUpload(event){
    this.files = event.target.files[0];
    console.log(this.files)
 }

}