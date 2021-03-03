import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderMaterialsComponent } from './show-order-materials.component';

describe('ShowOrderMaterialsComponent', () => {
  let component: ShowOrderMaterialsComponent;
  let fixture: ComponentFixture<ShowOrderMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
