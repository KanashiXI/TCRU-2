import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { FaqService } from './../../../Service/faqService.service';
import { FaqInterface } from './../interface/faqInterface';

@Component({
  selector: 'app-editFAQ',
  templateUrl: './editFAQ.component.html',
  styleUrls: ['./editFAQ.component.scss']
})
export class EditFAQComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;

  dataForm: FaqInterface;
  reactiveForm: FormGroup;

  editorForm: FormGroup;
  editorContent: string;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
    ]
  }

  constructor(
    private FaqService: FaqService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      faq_id: localStorage.getItem('faq_id'),
    }
    this.editorForm = new FormGroup({
      'answer': new FormControl(null)
    })
    this.createForm();
    this.getEditForm(requestData.faq_id);
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      faq_id: ['',],
      ask: ['',],
      answer: ['',],
    })
  }

  getEditForm(data) {
    this.FaqService.getOneFaq(data).subscribe(
      res => {
        // this.dataForm = res;
        this.dataForm = res;
        this.reactiveForm.patchValue({
          faq_id: this.dataForm[0].faq_id,
          ask: this.dataForm[0].ask,
          answer: this.dataForm[0].answer,
        })
      },
      error => this.errorMessage = <any>error
    )
  }

  onSubmit() {
    this.editorContent = this.reactiveForm.get('answer').value;
    console.log(this.editorForm.get('answer').value);
  }

  maxLenght(e){
    if(e.answer.getLength() > 1000){
      e.answer.deleteText(1000, e.answer.getLength());
    }
    console.log(e)
  }

  onClickSubmit() {
    this.FaqService.editFaq(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('showFAQ');

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

  get faq_id() {
    return this.reactiveForm.get('faq_id');
  }

  get ask() {
    return this.reactiveForm.get('ask');
  }

  get answer() {
    return this.reactiveForm.get('answer');
  }

}
