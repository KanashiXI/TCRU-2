import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlotComponent } from './addlot.component';

describe('AddlotComponent', () => {
  let component: AddlotComponent;
  let fixture: ComponentFixture<AddlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
