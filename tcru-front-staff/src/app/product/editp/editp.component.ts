// import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  form: FormGroup;
  date: any;
  files: any;
  categoryArr: any;
  unit_countArr: any;
  selectedMaterials:any = [];
  MaterialsList: any;


  constructor(private fb: FormBuilder,private http: HttpClient,
    private ProductService: ProductService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { 
  }
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
    this.getcategory();
    this.createForm();
    this.getunit_count();
    this.getDatamaterial();
  }
  createForm() {
    this.form = this.fb.group({
      // genid: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
      expire: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      unit_count_id: ['', [Validators.required]],
    });
  }
  getDatamaterial() {
    this.ProductService.getDatamaterial().subscribe(res => {
      this.MaterialsList = res;
      this.selectedMaterials = this.product.material_name.split(",");
    })
  }
getData(){
  this.ProductService.geteditProduct(this.id).subscribe(res=>{
    this.date = res;
    this.product = this.date;
    

  })
}
getcategory() {
  this.ProductService.getcategory().subscribe(res => {
    this.categoryArr = res;
  })
}
getunit_count() {
  this.ProductService.getunit_count().subscribe(res => {
    this.unit_countArr = res;
  })
}
editProduct(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
    this.product.material_name = this.selectedMaterials.toString();
  this.ProductService.editProduct(this.id,this.product).subscribe(res=>{
    this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
}
MaterialsChange(event){
  let index = this.selectedMaterials.indexOf(event.target.value);
  if(index == -1){
    this.selectedMaterials.push(event.target.value);
  } else{
    this.selectedMaterials.splice(index,1);
  }
  console.log(this.selectedMaterials)
}
get product_name() {
  return this.form.get('product_name')
}
get weight() {
  return this.form.get('weight')
}
get image() {
  return this.form.get('image')
}
get Detail() {
  return this.form.get('Detail')
}
get price() {
  return this.form.get('price')
}
get expire() {
  return this.form.get('expire')
}
get category_id() {
  return this.form.get('category_id')
}
get unit_count_id() {
  return this.form.get('unit_count_id')
}
}
