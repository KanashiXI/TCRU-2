import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../models/product.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-addp',
  templateUrl: './addp.component.html',
  styleUrls: ['./addp.component.css']
})
export class AddpComponent implements OnInit {

  dataArr: any;
  files: any;
  form: FormGroup;
  id: any;
  product = new product();
  date: any;
  categoryArr: any;
  unit_countArr: any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  selectedMaterials:any = [];
  MaterialsList: any;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.getProduct();
    this.getcategory();
    this.getunit_count();
    this.createForm();
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
      category_id: ['', [Validators.required]],
      unit_count_id: ['', [Validators.required]],
      critical: ['', [Validators.required]],
      weight_unit: ['', [Validators.required]],
    });
  }
  getProduct() {
    // this.spinner.show();
    if (this.page == 1) {
      this.skip = 0;
    } else {
      this.skip = (this.page - 1) * this.limit;
    }
    var requestObj = {
      'limit': this.limit,
      'skip': this.skip
    }

    this.ProductService.getData1(requestObj).subscribe((res: any) => {
      this.spinner.hide();
      this.dataArr = res.data;
      this.totalCount = res.totalRecord;
    })
  }
  insertData() {
    
    if (confirm('คุณต้องการเพิ่มข้อมูลสินค้าหรือไม่ ?') === true) {
       {
        // this.product.material_name = this.selectedMaterials.toString();
        let formdata = new FormData();
        formdata.append("file", this.files, this.files.name);
        formdata.append("data", JSON.stringify(this.product));
        this.ProductService.addProductData(formdata).subscribe(res => {
          this.getProduct();
          this.toastr.success('เพิ่มข้อมูลสินค้าสำเร็จ!');
        } ,
          err => {
            this.toastr.error('เพิ่มข้อมูลสินค้าล้มเหลว!');
            console.log(err);
          });
      }
    }
  }
  getDatamaterial() {
    this.ProductService.getDatamaterial().subscribe(res => {
      this.MaterialsList = res;
    })
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
  imageUpload(event) {
    this.files = event.target.files[0];
    console.log(this.files)
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
  get category_id() {
    return this.form.get('category_id')
  }
  get unit_count_id() {
    return this.form.get('unit_count_id')
  }
  get critical() {
    return this.form.get('critical')
  }
  get weight_unit() {
    return this.form.get('weight_unit')
  }

}


