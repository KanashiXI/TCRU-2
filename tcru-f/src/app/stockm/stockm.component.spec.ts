import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmComponent } from './stockm.component';

describe('StockmComponent', () => {
  let component: StockmComponent;
  let fixture: ComponentFixture<StockmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
