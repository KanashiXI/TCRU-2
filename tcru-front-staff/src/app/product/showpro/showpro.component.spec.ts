import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproComponent } from './showpro.component';

describe('ShowproComponent', () => {
  let component: ShowproComponent;
  let fixture: ComponentFixture<ShowproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
