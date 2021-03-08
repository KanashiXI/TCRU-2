import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { ShippingService } from './../../../Service/shippingService.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descriptionShipping',
  templateUrl: './descriptionShipping.component.html',
  styleUrls: ['./descriptionShipping.component.scss']
})
export class DescriptionShippingComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;
  
  dataSource: ShippingInterface[];
  dataForm: ShippingInterface;
  reactiveForm: FormGroup;

  constructor(
    private ShippingService: ShippingService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      promotion_id: localStorage.getItem('shipping_id'),
    }
    // this.getEditForm(requestData.promotion_id);
    this.ShippingService.getOnePromotion(requestData.promotion_id).subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }
  
  // getEditForm(data) {
  //   this.ShippingService.getOnePromotion(data).subscribe(
  //     res => {
  //       this.dataForm = res;
  //       this.reactiveForm.patchValue({
  //         shipping_id: this.dataForm[0].shipping_id,
  //         // shipping_brand_id: this.dataForm[0].shipping_brand_id,
  //         // number: this.dataForm[0].number,
  //         // price: this.dataForm[0].price,
  //         // send_date: this.dataForm[0].send_date,
  //         // estimate: this.dataForm[0].estimate,
  //         // order_id: this.dataForm[0].order_id,
  //       })
  //     },
  //     error => this.errorMessage = <any>error
  //   )
  // }


}
