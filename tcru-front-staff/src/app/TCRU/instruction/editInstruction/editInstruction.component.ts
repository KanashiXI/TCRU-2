import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { InstructorService } from './../../../Service/instructorService.service';
import { InstructionInterface } from './../interface/instructionInterface';

@Component({
  selector: 'app-editInstruction',
  templateUrl: './editInstruction.component.html',
  styleUrls: ['./editInstruction.component.scss']
})
export class EditInstructionComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;

  dataForm: InstructionInterface;
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
    private InstructorService: InstructorService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      instruction_id: localStorage.getItem('instruction_id'),
    }
    this.editorForm = new FormGroup({
      'detail': new FormControl(null)
    })
    this.createForm();
    this.getEditForm(requestData.instruction_id);
  }

  createForm() {
    this.reactiveForm = this.fb.group({

      instruction_id: ['',],
      title: ['',],
      detail: ['',],
    })
  }

  getEditForm(data) {
    this.InstructorService.getOneInstruction(data).subscribe(
      res => {
        // this.dataForm = res;
        this.dataForm = res;
        this.reactiveForm.patchValue({
          instruction_id: this.dataForm[0].instruction_id,
          title: this.dataForm[0].title,
          detail: this.dataForm[0].detail,
        })
      },
      error => this.errorMessage = <any>error
    )
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
    this.InstructorService.editInstruction(this.reactiveForm.getRawValue()).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('showInstruction');

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

  get instruction_id() {
    return this.reactiveForm.get('instruction_id');
  }

  get title() {
    return this.reactiveForm.get('title');
  }

  get detail() {
    return this.reactiveForm.get('detail');
  }

}
