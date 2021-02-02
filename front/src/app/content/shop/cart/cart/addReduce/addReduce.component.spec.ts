/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddReduceComponent } from './addReduce.component';

describe('AddReduceComponent', () => {
  let component: AddReduceComponent;
  let fixture: ComponentFixture<AddReduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
