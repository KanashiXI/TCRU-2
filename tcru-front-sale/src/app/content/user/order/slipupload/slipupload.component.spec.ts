import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipuploadComponent } from './slipupload.component';

describe('SlipuploadComponent', () => {
  let component: SlipuploadComponent;
  let fixture: ComponentFixture<SlipuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlipuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
