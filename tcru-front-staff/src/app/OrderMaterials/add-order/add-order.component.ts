import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { OrderMaterials } from '../../Models/OrderMaterials.model';
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  dataArr: any;
  form: FormGroup;
  Materials: FormGroup;
  id: any;
  OrderMaterials = new OrderMaterials();
  date: any;
  from: Date
  to: Date
  suppilerArr: any;
  sum_price: number = 0;
  sum_discount: number = 0;
  materialsArrayPrice: any;
  materialsArrayDiscount: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private OrderM: OrderMaterialsService,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.createForm();
    this.getsupplier();
  }

  createForm()
  {
    this.form = this.fb.group({
      shop_name: [''],
      contact_person: [''],
      phone_contact_person: [''],
      order_name: [''],
      address: [''],
      start_date: [''],
      end_date: [''],
      materials: this.fb.array([])
    });
  }

  materials(): FormArray
  {
    return this.form.get("materials") as FormArray
  }

  newMaterials(): FormGroup
  {
    return this.fb.group(
      {
        material_name: '',
        detail: '',
        quantity: '',
        price: '',
        discount: '',
        vat: '',
        TotalPrice: [{ value: "", disabled: true }]
      }
    )
  }

  addMaterials()
  {
    this.materials().push(this.newMaterials());
  }

  removeMaterials(i: number)
  {
    this.materials().removeAt(i);
  }

  sumPrice(materialsArrayPrice)
  {
    this.sum_price = 0;
    for (let i in materialsArrayPrice)
    {
      let totalUnitPrice = materialsArrayPrice[i].quantity * materialsArrayPrice[i].price;
      this.sum_price += totalUnitPrice;
    }
  }

  sumDiscount(materialsArrayDiscount)
  {
    this.sum_discount = 0;
    for (let i in materialsArrayDiscount)
    {
      let totalUnitDiscount = (materialsArrayDiscount[i].discount + materialsArrayDiscount[i].discount) / 100;
      this.sum_discount += totalUnitDiscount
    }
  }

  

  

  // orderMaterial()
  // {
  //   this.OrderM.getData1(this.dataArr).subscribe((res: any) =>{
  //     this.dataArr = res.data;
  //   })
  // }

  getsupplier() {
    this.OrderM.getsupplier().subscribe(res => {
      this.suppilerArr = res;
    })
  }

  updateFromDate(source) {
    this.from = source.target.valueAsDate;
  }
  updateToDate(source) {
    this.to = source.target.valueAsDate;
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
