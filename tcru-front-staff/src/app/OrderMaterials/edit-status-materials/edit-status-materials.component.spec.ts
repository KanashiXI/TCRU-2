import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatusMaterialsComponent } from './edit-status-materials.component';

describe('EditStatusMaterialsComponent', () => {
  let component: EditStatusMaterialsComponent;
  let fixture: ComponentFixture<EditStatusMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatusMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatusMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
