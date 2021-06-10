import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FaqService } from './../../../shared/service/faq.service';
import { FaqInterface } from './../../../shared/interface/faq';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  panelOpenState = false;

  dataSource: FaqInterface[];
  errorMessage: String;
  content: string;
  reactiveForm: FormGroup;
  instructionArr: FaqInterface[] = [];
  editorForm: FormGroup;

  constructor(
    private FaqService: FaqService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.FaqService.getFaq().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
    this.createForm();
    this.content = this.reactiveForm.get('answer').value;
    console.log(this.editorForm.get('answer').value);
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      faq_id: ['',],
      ask: ['',],
      answer: [''],
    })
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
  

}
