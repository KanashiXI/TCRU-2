import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FaqService } from './../../../Service/faqService.service';
import { FaqInterface } from './../interface/faqInterface';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createFAQ',
  templateUrl: './createFAQ.component.html',
  styleUrls: ['./createFAQ.component.scss']
})
export class CreateFAQComponent implements OnInit {

  editorForm: FormGroup;
  editorContent: string;

  reactiveForm: FormGroup;
  faqArr: FaqInterface[] = [];

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
    ]
  }

  imageDirectoyPath:any = 'http://127.0.0.1:8000/img/';
  files: File = null;

  constructor(
    private fb: FormBuilder,
    private FaqService: FaqService,  
    private router: Router,
  ) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'answer': new FormControl(null)
    })
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      faq_id: ['',],
      ask: ['',],
      answer: [''],
    })
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

  onFileSelected(event) {
    this.files = <File>event.target.files[0];
  }

  // imageUpload() {
  //   const formdata = new FormData();
  //   formdata.append('image', this.files, this.files.name);
  //   // formdata.append('order_id', this.orderId);

  //   if (formdata != null) {
  //     this.FaqService.uploadSlip(formdata).subscribe(res => {
  //       this.ngOnInit();
  //     });
  //     console.log("upload image")
  //   }
  // }

  onClickSubmit() {
    this.FaqService.addFaq(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('showFAQ');

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

  get faq_id() {
    return this.reactiveForm.get('faq_id')
  }

  get ask() {
    return this.reactiveForm.get('ask')
  }

  get answer() {
    return this.reactiveForm.get('answer')
  }

    get image() {
    return this.reactiveForm.get('image')
  }

}
