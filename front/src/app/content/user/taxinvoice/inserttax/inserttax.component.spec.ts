import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserttaxComponent } from './inserttax.component';

describe('InserttaxComponent', () => {
  let component: InserttaxComponent;
  let fixture: ComponentFixture<InserttaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserttaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserttaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
