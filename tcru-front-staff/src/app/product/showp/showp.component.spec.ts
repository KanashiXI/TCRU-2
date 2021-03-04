import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpComponent } from './showp.component';

describe('ShowpComponent', () => {
  let component: ShowpComponent;
  let fixture: ComponentFixture<ShowpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
