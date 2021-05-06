import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { chartsComponent } from './charts.component';

describe('chartsComponent', () => {
  let component: chartsComponent;
  let fixture: ComponentFixture<chartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ chartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(chartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
