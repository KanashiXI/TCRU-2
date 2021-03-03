import { HttpClient } from '@angular/common/http';
import { product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-showp',
  templateUrl: './showp.component.html',
  styleUrls: ['./showp.component.css']
})
export class ShowpComponent implements OnInit {

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
    private ProductService: ProductService,
    // private toastr: ToastrService,
    private route: ActivatedRoute,
    // private spinner: NgxSpinnerService,
    ) {

  }
  ngOnInit(): void {
    this.getProduct();
  }
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

  deleteProduct(id){
    if (confirm('คุณต้องการลบหรือไม่ ?') === true)
    this.ProductService.deleteProduct(id).subscribe(result => {
      this.getProduct();
      // this.spinner.show();
      // this.toastr.success('ลบข้อมูลสินค้าสำเร็จ!'); 
    },
    err => {
    // this.toastr.error('ลบล้มข้อมูลสินค้าเหลว!');
    // this.spinner.show();
    console.log(err);
    });
}

// Search(){
//   if(this.material_name == ""){
//     this.ngOnInit();

//   }else{
  
//       this.materialList = this.materialList.filter(res =>{
//         return res.material_name.toLocawerCase().match(this.material_name.toLocawerCase());
//       })
  
//   }


//   }
}
  
