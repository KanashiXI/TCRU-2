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
import { Material } from '../../models/Material.model';
@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  form: FormGroup;
  files: any;
  dataArr: any;
  dataformula: any;
  formula = new formula();
  formula1 = new formula();
  MaterialsList: any;
  Materials = new Material();
  MaterialCategory: any;
  dataaArr: any = [];
  productList: any;
  id: any;
  categoryArr: any;
  date: any;
  product = new product();

  constructor(private fb: FormBuilder, private http: HttpClient,
    private FormulaService: FormulaService,
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
    this.getDatamaterial();
    this.getDataproduct();
    this.createForm();
    this.getFormula();
    this.getDataPro();
    this.getcategory();
  }
  getFormula() {
    this.FormulaService.getformulaid(this.id).subscribe(res => {
      this.dataformula = res;
      this.formula1 = this.dataformula;
      console.log(this.formula1)
    })
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
  // removeForm(index){
  //   this.dataaArr.splice(index)
  // }
  getData() {
    this.FormulaService.getformula().subscribe(res => {
      this.dataArr = res;
    })
  }
  getDatamaterial() {
    this.FormulaService.getDatamaterial().subscribe(res => {
      this.MaterialsList = res;
    })
  }
  getMaterialCategory(event) {
    var obj = {
      category_id: event.target.value
    }
    this.FormulaService.MaterialCategory(obj).subscribe(res => {
      this.MaterialCategory = res;
    });
  }
  getDataproduct() {
    this.FormulaService.getDataproduct().subscribe(res => {
      this.productList = res;
      console.log(this.productList);
    })
  }
  getcategory() {
    this.FormulaService.getcategory().subscribe(res => {
      this.categoryArr = res;
    })
  }
  getDataPro() {
    this.ProductService.geteditProduct(this.id).subscribe(res => {
      this.date = res;
      this.product = this.date;
      console.log(this.product)
    })
  }

  insertData() {

    if (confirm('คุณต้องการเพิ่มข้อมูลสินค้าหรือไม่ ?') === true) {
      {
        this.formula.product_id = this.product.id;
        this.FormulaService.addformula(this.formula).subscribe(res => {
          this.getFormula();
          this.toastr.success('เพิ่มข้อมูลสินค้าสำเร็จ!');
        },
          err => {
            this.toastr.error('ไม่สามารถเพิ่มข้อมูลสินค้าได้!');
            console.log(err);
          });
      }
    }
  }
  deleteFormula(id) {
    if (confirm('คุณต้องการลบหรือไม่ ?') === true)
      this.FormulaService.deleteFormula(id).subscribe(result => {
        this.getFormula();
        this.toastr.success('ลบข้อมูลสำเร็จ!');
      },
        err => {
          this.toastr.error('ลบข้อมูลล้มเหลว!');
          console.log(err);
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
