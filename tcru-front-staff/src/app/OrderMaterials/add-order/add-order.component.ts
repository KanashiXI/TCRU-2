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

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  dataArr: any;
  form: FormGroup;
  Materials: FormGroup;
  formvat: FormGroup;
  id: any;
  OrderMaterials = new OrderMaterials();
  date: any;
  from: Date
  to: Date
  suppilerArr: any;
  sum_price: number = 0;
  sum_discount: number = 0;
  sumPrice$: Observable<number>;
  sumDiscount$: Observable<number>;
  sumVat$: Observable<number>;
  sumAfterDiscount$: Observable<number>;
  sumAfterDiscount: number = 0;
  materialsArrayAfterDiscount: any;
  sum: number = 0;
  sumVat: number = 0;
  isVat = false;
  summary = 0;
  unitArr: any;
  isValidFormSubmitted = null;
  sum_AfterDiscount: number = 0;
  sumNovat$: Observable<number>;
  sumTotal$: Observable<number>;
  files: any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;

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

  createForm()
  {
    this.form = this.fb.group({
      shop_name: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      phone_contact_person: ['', [Validators.required]],
      order_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      start_date: [''],
      end_date: [''],
      materials: this.fb.array([this.newMaterials()])
      
    });

    this.formvat = this.fb.group(
      {
        vat: ['N']
      }
    )

    this.sumPrice$ = this.materials().valueChanges.pipe(map(groupList=>groupList.reduce((sum,group)=>sum +Number(group.price) * Number(group.quantity),0)))
    this.sumDiscount$ = this.materials().valueChanges.pipe(map(groupList=>groupList.reduce((sum,group)=>sum+(Number(group.price) * Number(group.discount) / 100) ,0) ))
    this.sumAfterDiscount$ = combineLatest([this.sumPrice$,this.sumDiscount$]).pipe(map(([sumPrice,sumCount])=>sumPrice - sumCount));
    this.sumVat$ = combineLatest([this.sumAfterDiscount$]).pipe(map(([sumVat])=>sumVat + sumVat * 0.07));
    // this.sumTotal$ = combineLatest([this.sumAfterDiscount$]).pipe(map(([sumVat])=>sumVat + sumVat * 0.7));
    
    this.materials().valueChanges.subscribe(form => {
      let sum: number = 0;
      let sumprice: number = 0;
      let sumdiscount: number = 0;
      form.forEach(({ price, discount, quantity}) => {
        sumprice = price * quantity;
        sumdiscount = (price * quantity) /100
        this.sum = sumprice - sumdiscount
      });
    })
  }

  materials(): FormArray
  {
    return this.form.get("materials") as FormArray
  }

  newMaterials(): FormGroup
  {
    return this.fb.group(
      {
        material_name: ['', [Validators.required]],
        detail: [''],
        quantity: ['', [Validators.required]],
        unit:[''],
        price: [''],
        discount: [''],
      }
    )
  }

  getSummary(materialss) {
    return (
      materialss.price * materialss.quantity - (materialss.price * materialss.quantity * materialss.discount) / 100
    );
  }

  get getGranTotalVat() {
    return this.sum + this.sum * 0.7;
  }
  get IncludeVat() {
    return this.sum * 0.7;
  }
  get noVat(){
    return this.sum + 0;
  }
  get sumnoVat(){
    return this.summary = this.sum;
  }

  addMaterials()
  {
    this.materials().push(this.newMaterials());
  }

  removeMaterials(i: number)
  {
    this.materials().removeAt(i);
  }
  
  getsupplier() {
    this.OrderM.getsupplier().subscribe(res => {
      this.suppilerArr = res;
    })
  }

  getunit(){
    this.OrderM.getunit_material().subscribe(res => {
        this.unitArr = res
      }
    )
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
        }
          ,
          err => {
            this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
            console.log(err);
          });
      }

    }
  }

  get shop_name() {
    return this.form.get('shop_name')
  }

  get contact_person(){
    return this.form.get('contact_person')
  }

  get phone_contact_person(){
    return this.form.get('phone_contact_person')
  }

  get order_name(){
    return this.form.get('order_name')
  }

  get address(){
    return this.form.get('address')
  }

  get start_date(){
    return this.form.get('start_date')
  }

  get end_date(){
    return this.form.get('end_date')
  }

  get material_name(){
    return this.form.get('Materials').get('material_name')
  }

  get detail(){
    return this.form.get('Materials').get('detail')
  }

  get quantity(){
    return this.form.get('Materials').get('quantity')
  }

  get price(){
    return this.form.get('Materials').get('price')
  }

  get discount(){
    return this.form.get('Materials').get('discount')
  }

  get vat(){
    return this.form.get('Materials').get('vat')
  }

}
