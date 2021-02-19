import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestockmComponent } from './updatestockm.component';

describe('UpdatestockmComponent', () => {
  let component: UpdatestockmComponent;
  let fixture: ComponentFixture<UpdatestockmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatestockmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatestockmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
