import { reverse } from 'dns';
import { HttpClient } from '@angular/common/http';
import { product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-showp',
  templateUrl: './showp.component.html',
  styleUrls: ['./showp.component.css']
})
export class ShowpComponent implements OnInit {
  materialList: any[] = [];
  searchText: string;
  imageDirectoyPath: any = 'http://127.0.0.1:5000/public/image/';
  material_id: string;
  Search: string;
  materialMessage: string;
  product = new product();
  dataArr: any;
  material_name: any;
  name: any;
  page: any = 1;
  limit: any = 10;
  form: FormGroup;
  skip: any;
  categoryArr: any;
  totalCount: any;
  ProductCategory: any;
  obj: any;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private ProductService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
  }
  ngOnInit(): void {
    this.getProduct();
    this.getcategory();
    this.getProduct1();
    this.createForm();
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

      console.log(this.dataArr)
      // console.log(this.dataArr);
    })
  }
  getcategory() {
    this.ProductService.getcategory().subscribe(res => {
      this.categoryArr = res;
      console.log(this.categoryArr)
    })
  }
  getProductCategory(event) {
    var obj = {
      category_id: event.target.value

    }
    let x = obj.category_id
    if (x != "") {
      
        this.ProductService.ProductCategory(obj).subscribe(res => {
          this.ProductCategory = res;
          console.log(obj)

      });
    } else
    {
      this.ProductService.getProduct().subscribe(res => {
        this.ProductCategory = res;
        console.log(x)
      
      });
    }
    console.log(this.category_id)
  }
  getProduct1() {
    this.ProductService.getProduct().subscribe(res => {
      // this.spinner.hide();
      this.dataArr = res;
    })
  }
  key: string = 'id';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  deleteProduct(id) {
    if (confirm('คุณต้องการลบหรือไม่ ?') === true)
      this.ProductService.deleteProduct(id).subscribe(result => {
        this.getProduct();
        this.spinner.show();
        this.toastr.success('ลบข้อมูลวัตถุดิบสำเร็จ!');
        console.log(id);
      },
        err => {
          this.toastr.error('ลบล้มข้อมูลวัตถุดิบเหลว!');
          this.spinner.show();
          console.log(err);
        });
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
  get critical() {
    return this.form.get('critical')
  }
  get weight_unit() {
    return this.form.get('weight_unit')
  }
}

