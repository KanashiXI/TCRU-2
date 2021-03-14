import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PromotionInteface } from './../interfaces/promotioninterface';
import { PromotionService } from './../../../Service/promotion.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editPromotion',
  templateUrl: './editPromotion.component.html',
  styleUrls: ['./editPromotion.component.css']
})
export class EditPromotionComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;

  dataForm: PromotionInteface;
  reactiveForm: FormGroup;

  constructor(
    private PromotionService: PromotionService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      promotion_id: localStorage.getItem('promotion_id'),
    }

    this.createForm();
    this.getEditForm(requestData.promotion_id);
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      promotion_id: ['',],
      promotion_name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      status: ['', [Validators.required]],
      cost_condidtion: ['', [Validators.required]],
    })
  }

  getEditForm(data) {
    this.PromotionService.getOnePromotion(data).subscribe(
      res => {
        // this.dataForm = res;
        this.dataForm = res;
        this.reactiveForm.patchValue({
          promotion_id: this.dataForm[0].promotion_id,
          promotion_name: this.dataForm[0].promotion_name,
          detail: this.dataForm[0].detail,
          unit: this.dataForm[0].unit,
          status: this.dataForm[0].status,
          cost_condidtion: this.dataForm[0].cost_condidtion,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  onClickSubmit() {
    this.PromotionService.editPromotion(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('promotion');

      },
      error => {

        Swal.fire({
          icon: 'error',
          title: 'แก้ไขข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  get promotion_id() {
    return this.reactiveForm.get('promotion_id');
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

  get status() {
    return this.reactiveForm.get('status')
  }

  get cost_condidtion() {
    return this.reactiveForm.get('cost_condidtion')
  }

}
