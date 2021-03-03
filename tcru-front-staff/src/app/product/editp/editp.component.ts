// import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';
import { product } from '../../models/product.model';
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-editp',
  templateUrl: './editp.component.html',
  styleUrls: ['./editp.component.css']
})
export class EditpComponent implements OnInit {

  id: any;
  product=new product();
  date: any;
  files: any;


  constructor(private http: HttpClient,
    private ProductService: ProductService,
    // private toastr: ToastrService,
    private route:ActivatedRoute) { 
  }
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }
getData(){
  this.ProductService.geteditProduct(this.id).subscribe(res=>{
    this.date = res;
    this.product = this.date;
  })
}
editProduct(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
  this.ProductService.editProduct(this.id,this.product).subscribe(res=>{
    // this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    // this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
}
}
