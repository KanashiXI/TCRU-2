import { reverse } from 'dns';
import { HttpClient } from '@angular/common/http';
import { product } from '../../models/product.model';
import { production } from '../../models/production.model';
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
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css']
})
export class EditstockComponent implements OnInit {

  dataaArr: any = [ ];
  product = new product();
  production = new production();
  formula1 = new formula();
  dataformula: any;
  id: any;
  dataArr: any;
  dataArrr: any;
  dataArrrr: any;
  formulaArr: any;
  form: FormGroup;
  x: any;
  

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private ProductService: ProductService,
    private FormulaService: FormulaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    // this.getFormula();
    this.createForm();
    this.getData();
    this.getProduct1();
  }
  createForm() {
    this.form = this.fb.group({
      product_id: ['', [Validators.required]],
      product_name: ['',],
      material_name: ['',],
      quantity: ['',],
      unit: ['',],
      MFG: ['',],
      status: ['',],
      material1: ['',],
      material2: ['',],
      material3: ['',],
      material4: ['',],
      material5: ['',],
      material6: ['',],
      total1: ['',],
      total2: ['',],
      total3: ['',],
      total4: ['',],
      total5: ['',],
      total6: ['',],
      lotmaterial1: ['',],
      lotmaterial2: ['',],
      lotmaterial3: ['',],
      lotmaterial4: ['',],
      lotmaterial5: ['',],
      lotmaterial6: ['',],

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
  getData(){
    this.ProductService.Oneupdateproduction(this.id).subscribe(res=>{
      this.dataArrrr = res;
      this.production = this.dataArrrr;
    })
  }
  getProduct1() {
    this.ProductService.getProduct().subscribe(res => {
      this.dataArr = res;
      console.log(this.dataArr)
    })
  }
  editProduct(){
    if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
      this.production.status = 1;
    this.ProductService.updateproduction(this.id,this.production).subscribe(res=>{
      this.toastr.success('แก้ไขสำเร็จ!');
    },
      err => {
      this.toastr.error('แก้ไขล้มเหลว!');
      console.log(err);
    });
  }
  }

  get product_id() {
    return this.form.get('product_id')
  }
  get product_name() {
    return this.form.get('product_name')
  }
  get status() {
    return this.form.get('status')
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
  get MFG() {
    return this.form.get('MFG')
  }
  get material1() {
    return this.form.get('material1')
  }
  get material2() {
    return this.form.get('material2')
  }
  get material3() {
    return this.form.get('material3')
  }
  get material4() {
    return this.form.get('material4')
  }
  get material5() {
    return this.form.get('material5')
  }
  get material6() {
    return this.form.get('material6')
  }
  get total1() {
    return this.form.get('total1')
  }
  get total2() {
    return this.form.get('total2')
  }
  get total3() {
    return this.form.get('total3')
  }
  get total4() {
    return this.form.get('total4')
  }
  get total5() {
    return this.form.get('total5')
  }
  get total6() {
    return this.form.get('total6')
  }
  get lotmaterial1() {
    return this.form.get('lotmaterial1')
  }
  get lotmaterial2() {
    return this.form.get('lotmaterial2')
  }
  get lotmaterial3() {
    return this.form.get('lotmaterial3')
  }
  get lotmaterial4() {
    return this.form.get('lotmaterial4')
  }
  get lotmaterial5() {
    return this.form.get('lotmaterial5')
  }
  get lotmaterial6() {
    return this.form.get('lotmaterial6')
  }

}

