import { Component, OnInit } from '@angular/core';
import { FormulaService } from 'src/app/service/formula.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formula } from 'src/app/models/formula.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from '../../service/product.service';
import { product } from '../../models/product.model';
@Component({
  selector: 'app-showformula',
  templateUrl: './showformula.component.html',
  styleUrls: ['./showformula.component.css']
})
export class ShowformulaComponent implements OnInit {
  form: FormGroup;
  files: any;
  dataArr: any;
  formula = new formula();
  MaterialsList: any;
  dataaArr: any = [ ];
  productList: any;
  date: any;
  id: any;
  categoryArr: any;
  unit_countArr: any;
  product=new product();
  constructor(private fb: FormBuilder, private http: HttpClient,
    private FormulaService: FormulaService,
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getData();
    this.getDataPro();
    this.createForm();
    this.getcategory();
    this.getunit_count();
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
  getDataPro(){
    this.ProductService.geteditProduct(this.id).subscribe(res=>{
      this.date = res;
      this.product = this.date;
      console.log(this.product)
    })
  }
  getData(){
    this.FormulaService.getformulaid(this.id).subscribe(res=>{
      this.dataArr = res;
      this.formula = this.dataArr;
      console.log(this.formula)
    })
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
