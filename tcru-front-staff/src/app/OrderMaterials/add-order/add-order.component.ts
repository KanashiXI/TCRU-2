import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { OrderMaterials } from '../../Models/OrderMaterials.model';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  dataArr: any;
  form: FormGroup;
  id: any;
  OrderMaterials = new OrderMaterials();
  date: any;
  from: Date
  to: Date
  suppilerArr: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private OrderM: OrderMaterialsService,
    private route: ActivatedRoute) { 
      this.form = this.fb.group({
        credentials: this.fb.array([]),
      });
    }

  ngOnInit(): void {
    this.createForm();
    this.getsupplier();
  }

  createForm()
  {
    this.form = this.fb.group({
      shop_id: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      phone_contact_person: ['', [Validators.required]],
      order_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      material_name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      quantity: ['', [Validators.minLength(0),]],
      price: ['', [Validators.minLength(0),]],
      discount: ['', [Validators.minLength(0),]],
      vat: ['', [Validators.minLength(0),]]
    })
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

  get shop_id() {
    return this.form.get('shop_id')
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
    return this.form.get('material_name')
  }

  get detail(){
    return this.form.get('detail')
  }

  get quantity(){
    return this.form.get('quantity')
  }

  get price(){
    return this.form.get('price')
  }

  get discount(){
    return this.form.get('discount')
  }

  get vat(){
    return this.form.get('vat')
  }

}
