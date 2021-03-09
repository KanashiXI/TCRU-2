import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { from } from 'rxjs';
import { FormControl, FormGroup, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  form: FormGroup;
  model: NgbDateStruct;

  constructor(private fb: FormBuilder,
    private calendar: NgbCalendar) { 
      this.form = this.fb.group({
        credentials: this.fb.array([]),
      });
    }

  ngOnInit(): void {
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      Material: ['', {
        validators:[this.isNameDuplicate()],
        updateOn:'blur'}],
      Detail: '',
      Quantity: '',
      Price: '',
      PriceSum: ''
    }));
  }

  isNameDuplicate(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
    const Material = this.form.get("credentials").value;
    console.log(Material);
    const names = Material.map(item=> item.Material.trim());
    const hasDuplicate = names.some(
    (name, index) => names.indexOf(name, index + 1) != -1
  );

  if (hasDuplicate) {
    console.log(hasDuplicate);
    return { duplicate: true };
  }

  return null;
  }
}

}
