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

  constructor(private fb: FormBuilder, private http: HttpClient,
    private FormulaService: FormulaService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getData();
    this.getDatamaterial();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      quantity: ['', [Validators.required]],
      material_id: ['', [Validators.required]],
      material_name: ['', [Validators.required]],
    });
  }
  getData() {
    this.FormulaService.getformula().subscribe(res => {
      this.dataArr = res;
    });}
    getDatamaterial() {
      this.FormulaService.getDatamaterial().subscribe(res => {
        this.MaterialsList = res;
      })
    }

  insertData() {
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      if (this.form.invalid) {
        return;
      } else {
        this.FormulaService.addformula(this.formula).subscribe(res => {
          this.getData();
          // this.toastr.success('เพิ่มข้อมูลวัตถุดิบสำเร็จ!');
        },
          err => {
            // this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
            console.log(err);
          });
      }
    }
  }
  get quantity() {
    return this.form.get('quantity')
  }
  get material_id() {
    return this.form.get('material_id')
  }
  get material_name() {
    return this.form.get('material_name')
  }

}
