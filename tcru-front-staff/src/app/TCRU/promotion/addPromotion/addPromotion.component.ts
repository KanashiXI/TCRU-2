import { Component, OnInit } from '@angular/core';
import { PromotionInteface } from '../interfaces/promotioninterface';
import { PromotionService } from './../../../Service/promotion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-addPromotion',
  templateUrl: './addPromotion.component.html',
  styleUrls: ['./addPromotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  dataForm: PromotionInteface;
  reactiveForm: FormGroup;
  errorMessage: String;

  promotionArr: PromotionInteface[] = [];

  constructor(
    private fb: FormBuilder,
    private PromotionService: PromotionService,  
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      promotion_id: ['',],
      promotion_name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      // status: ['', [Validators.required]],
      cost_condidtion: ['', [Validators.required]],
    })
  }


  onClickSubmit() {
    this.PromotionService.addPromotion(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('promotion');

      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }


    )

  }
  
  get promotion_id() {
    return this.reactiveForm.get('promotion_id')
  }

  get promotion_name() {
    return this.reactiveForm.get('promotion_name')
  }

  get detail() {
    return this.reactiveForm.get('detail')
  }

  get unit() {
    return this.reactiveForm.get('unit')
  }

  // get status() {
  //   return this.reactiveForm.get('status')
  // }

  get cost_condidtion() {
    return this.reactiveForm.get('cost_condidtion')
  }

  // get created_at() {
  //   return this.reactiveForm.get('created_at')
  // }

  // get updated_at() {
  //   return this.reactiveForm.get('updated_at')
  // }
}
