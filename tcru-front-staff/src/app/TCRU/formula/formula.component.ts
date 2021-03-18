import { Component, OnInit } from '@angular/core';
import { FormulaService } from 'src/app/service/formula.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formula } from 'src/app/models/formula.model';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  form: FormGroup;
  files: any;
  dataArr: any;
  formula = new formula();
  MaterialsList: any;
  dataaArr: any = [ ];
  productList: any;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private FormulaService: FormulaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getData();
    this.getDatamaterial();
    this.getDataproduct();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      material_id: ['',],
      product_id: ['', [Validators.required]],
      product_name: ['',],
      material_name: ['',],
      quantity: ['',],
      material_name0: ['',],
      quantity0: ['',],
      material_name1: ['',],
      quantity1: ['',],
      material_name2: ['',],
      quantity2: ['',],
      material_name3: ['',],
      quantity3: ['',],
      material_name4: ['',],
      quantity4: ['',],
      material_name5: ['',],
      quantity5: ['',],
      material_name6: ['',],
      quantity6: ['',],
      material_name7: ['',],
      quantity7: ['',],
      material_name8: ['',],
      quantity8: ['',],
      material_name9: ['',],
      quantity9: ['',],

    });
  }
  addForm(){
    this.formula = new formula();
    this.dataaArr.push(this.formula)
    console.log(this.dataaArr);
  }
  removeForm(index){
    this.dataaArr.splice(index)
  }
  getData() {
    this.FormulaService.getformula().subscribe(res => {
      this.dataArr = res;
    })}
    getDatamaterial() {
      this.FormulaService.getDatamaterial().subscribe(res => {
        this.MaterialsList = res;
      })
    }
    getDataproduct() {
      this.FormulaService.getDataproduct().subscribe(res => {
        this.productList = res;
        console.log(this.productList);
      })
    }

    insertData() {
    
      if (confirm('คุณต้องการเพิ่มข้อมูลสินค้าหรือไม่ ?') === true) {
         {
          
          this.FormulaService.addformula(this.formula).subscribe(res => {
            this.getData();
            this.toastr.success('เพิ่มข้อมูลสินค้าสำเร็จ!');
          } ,
            err => {
              this.toastr.error('เพิ่มข้อมูลสินค้าล้มเหลว!');
              console.log(err);
            });
        }
      }
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
  get material_name0() {
    return this.form.get('material_name0')
  }
  get quantity0() {
    return this.form.get('quantity0')
  }
  get material_name1() {
    return this.form.get('material_name1')
  }
  get quantity1() {
    return this.form.get('quantity1')
  }
  get material_name2() {
    return this.form.get('material_name2')
  }
  get quantity2() {
    return this.form.get('quantity2')
  }
  get material_name3() {
    return this.form.get('material_name3')
  }
  get quantity3() {
    return this.form.get('quantity3')
  }
  get material_name4() {
    return this.form.get('material_name4')
  }
  get quantity4() {
    return this.form.get('quantity4')
  }
  get material_name5() {
    return this.form.get('material_name5')
  }
  get quantity5() {
    return this.form.get('quantity5')
  }
  get material_name6() {
    return this.form.get('material_name6')
  }
  get quantity6() {
    return this.form.get('quantity6')
  }
  get material_name7() {
    return this.form.get('material_name7')
  }
  get quantity7() {
    return this.form.get('quantity7')
  }
  get material_name8() {
    return this.form.get('material_name8')
  }
  get quantity8() {
    return this.form.get('quantity8')
  }
  get material_name9() {
    return this.form.get('material_name9')
  }
  get quantity9() {
    return this.form.get('quantity9')
  }
  get material_name() {
    return this.form.get('material_name')
  }
  get quantity() {
    return this.form.get('quantity')
  }


}
