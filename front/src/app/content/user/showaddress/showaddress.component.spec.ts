import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowaddressComponent } from './showaddress.component';

describe('ShowaddressComponent', () => {
  let component: ShowaddressComponent;
  let fixture: ComponentFixture<ShowaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
