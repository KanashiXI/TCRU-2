import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from './../../../Service/instructorService.service';
import { InstructionInterface } from './../interface/instructionInterface';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createInstruction',
  templateUrl: './createInstruction.component.html',
  styleUrls: ['./createInstruction.component.scss']
})
export class CreateInstructionComponent implements OnInit {

  editorForm: FormGroup;
  editorContent: string;

  reactiveForm: FormGroup;
  instructionArr: InstructionInterface[] = [];

  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });

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
    private fb: FormBuilder,
    private InstructorService: InstructorService,  
    private router: Router,
  ) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'detail': new FormControl(null)
    })
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      instruction_id: ['',],
      title: ['',],
      detail: [''],
    })
  }

  onSubmit() {
    this.editorContent = this.reactiveForm.get('detail').value;
    console.log(this.editorForm.get('detail').value);
  }

  maxLenght(e){
    if(e.detail.getLength() > 1000){
      e.detail.deleteText(1000, e.detail.getLength());
    }
    console.log(e)
  }

  onClickSubmit() {
    this.InstructorService.addInstruction(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('showInstruction');

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

  get instruction_id() {
    return this.reactiveForm.get('instruction_id')
  }

  get title() {
    return this.reactiveForm.get('title')
  }

  get detail() {
    return this.reactiveForm.get('detail')
  }

}
