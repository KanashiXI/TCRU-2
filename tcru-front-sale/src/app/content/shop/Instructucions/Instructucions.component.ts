import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InstructionInterface } from './../../../shared/interface/instructionInterface';
import { InstructorService } from './../../../shared/service/instructor.service';

@Component({
  selector: 'app-Instructucions',
  templateUrl: './Instructucions.component.html',
  styleUrls: ['./Instructucions.component.scss']
})
export class InstructucionsComponent implements OnInit {

  panelOpenState = false;

  dataSource: InstructionInterface[];
  errorMessage: String;
  content: string;
  reactiveForm: FormGroup;
  instructionArr: InstructionInterface[] = [];
  editorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private InstructorService: InstructorService,
  ) { }

  ngOnInit() {
    this.InstructorService.getInstruction().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
    this.editorForm = new FormGroup({
      'detail': new FormControl(null)
    })
    this.createForm();
    this.content = this.reactiveForm.get('detail').value;
    console.log(this.editorForm.get('detail').value);
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      instruction_id: ['',],
      title: ['',],
      detail: [''],
    })
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
