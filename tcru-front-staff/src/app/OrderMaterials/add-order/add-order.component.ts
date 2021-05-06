import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { OrderMaterials } from '../../Models/OrderMaterials.model';
import { CurrencyPipe } from "@angular/common";
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { threadId } from 'node:worker_threads';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  dataArr: any;
  form: FormGroup;
  formMaterial: FormGroup;
  formvat: FormGroup;
  id: any;
  OrderMaterials = new OrderMaterials();
  date: any;
  from: Date
  to: Date
  suppilerArr: any;
  unitArr: any;
  files: any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  data: Array<string[]>;
  materialsArr: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private OrderM: OrderMaterialsService,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.createForm();
    this.getsupplier();
    this.getunit();
  }

  createForm() {
    this.form = this.fb.group({
      shop_name: [''],
      contact_person: [''],
      phone_contact_person: [''],
      order_name: [''],
      address: [''],
      start_date: [''],
      end_date: ['']
    });

    this.formMaterial = this.fb.group(
      {
        material_name: [''],
        quantity: [''],
        unit: [''],
        price: [''],
        discount: [''],
      }
    )
    this.data = [];

    this.formvat = this.fb.group(
      {
        vat: ["N"]
      }
    )
  }

  add()
  {
    if (this.formMaterial.valid)
    {
      this.data.push(this.formMaterial.value)
      this.formMaterial.reset();
    }
  }

  summary(data)
  {
    return parseInt(
      (data.price * data.quantity - (data.price * data.quantity * data.discount) / 100).toFixed(2)
    )
  }

  getsupplier() {
    this.OrderM.getsupplier().subscribe(res => {
      this.suppilerArr = res;
    })
  }

  getunit() {
    this.OrderM.getunit_material().subscribe(res => {
      this.unitArr = res
    })
  }

  getmaterial(){
    this.OrderM.getmaterial().subscribe(res => {
      this.materialsArr = res
    })
  }

  updateFromDate(source) {
    this.from = source.target.valueAsDate;
  }
  updateToDate(source) {
    this.to = source.target.valueAsDate;
  }

  insertData() {
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      {
        let formdata = new FormData();
        formdata.append("data", JSON.stringify(this.OrderMaterials));
        this.OrderM.addOrderM(formdata).subscribe(res => {
          this.toastr.success('เพิ่มข้อมูลวัตถุดิบสำเร็จ!');
        },
          err => {
            this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
            console.log(err);
          });
      }

    }
  }

  get shop_name()
  {
    return this.form.get('shop_name')
  }

  get contact_person()
  {
    return this.form.get('contact_person')
  }

  get phone_contact_person()
  {
    return this.form.get("phone_contact_person")
  }

  get order_name()
  {
    return this.form.get("order_name")
  }

  get address()
  {
    return this.form.get('address')
  }

  get start_date()
  {
    return this.form.get('start_date')
  }

  get end_date()
  {
    return this.form.get('end_date')
  }

  get material_name()
  {
    return this.formMaterial.get('material_name')
  }

  get quantity()
  {
    return this.formMaterial.get('quantity')
  }

  get unit()
  {
    return this.formMaterial.get('unit')
  }

  get price()
  {
    return this.formMaterial.get('price')
  }

  get discount()
  {
    return this.formMaterial.get('discount')
  }

}
