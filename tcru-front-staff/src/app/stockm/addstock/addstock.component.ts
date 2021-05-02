import { reverse } from 'dns';
import { HttpClient } from '@angular/common/http';
import { product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { formula } from 'src/app/models/formula.model';
import { FormulaService } from 'src/app/service/formula.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  dataaArr: any = [ ];
  product = new product();
  formula1 = new formula();
  dataformula: any;
  id: any;
  dataArr: any;
  formulaArr: any;
  form: FormGroup;
  

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private ProductService: ProductService,
    private FormulaService: FormulaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getFormula();
    this.getProduct1();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      material_id: ['',],
      product_id: ['', [Validators.required]],
      product_name: ['',],
      material_name: ['',],
      quantity: ['',],
      unit: ['',],

    });
  }
  // addForm(){
  //   this.formula = new formula();
  //   this.dataaArr.push(this.formula)
  //   console.log(this.dataaArr);
  // }
  removeForm(index){
    this.dataaArr.splice(index)
  }
  addForm(){
    this.product = new product();
    this.dataaArr.push(this.product)
    console.log(this.dataaArr);
  }
  getFormula() {
    this.FormulaService.getformulaid(this.id).subscribe(res => {
      this.dataformula = res;
      this.formula1 = this.dataformula;
      console.log(this.formula1)
    })
  }
  getProduct1() {
    this.ProductService.getProduct().subscribe(res => {
      this.dataArr = res;
      console.log(this.dataArr)
    })
  }
  formulabyproduct(event) {
    var obj = {
      product_id: event.target.value
    }
    this.FormulaService.formulabyproduct(obj).subscribe(res => {
      this.formulaArr = res;
    });
  }
  get product_id() {
    return this.form.get('product_id')
  }
  get product_name() {
    return this.form.get('product_name')
  }
  get material_id() {
    return this.form.get('material_id')
  }
  get material_name() {
    return this.form.get('material_name')
  }
  get quantity() {
    return this.form.get('quantity')
  }
  get unit() {
    return this.form.get('unit')
  }

}

