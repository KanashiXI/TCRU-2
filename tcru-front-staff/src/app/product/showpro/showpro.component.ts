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
  selector: 'app-showpro',
  templateUrl: './showpro.component.html',
  styleUrls: ['./showpro.component.css']
})
export class ShowproComponent implements OnInit {
  materialList: any[] = [];
  searchText: string;
  imageDirectoyPath: any = 'http://127.0.0.1:5000/public/image/';
  material_id: string;
  Search: string;
  materialMessage: string;
  product = new product();
  criticalArr: any;
  material_name: any;
  name: any;
  page: any = 1;
  limit: any = 10;
  form: FormGroup;
  skip: any;
  categoryArr: any;
  totalCount: any;
  ProductCategory: any;
  productionArr: any;
  productionsum: any;
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
    this.getcritical();
    this.createForm();
    this.getproduction();
    this.getproductionsum();
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
  getcritical() {
    this.ProductService.getcritical().subscribe(res => {
      this.criticalArr = res;
    })
  }
  getproduction() {
    this.ProductService.getproduction().subscribe(res => {
      this.productionArr = res;
      console.log(this.productionArr);
    })
  }
  getproductionsum() {
    this.ProductService.getproductionsum().subscribe(res => {
      this.productionsum = res;
      console.log(this.productionsum);
    })
  }
  
  key: string = 'id';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
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

