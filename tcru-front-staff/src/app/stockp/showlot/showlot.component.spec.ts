import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowlotComponent } from './showlot.component';

describe('ShowlotComponent', () => {
  let component: ShowlotComponent;
  let fixture: ComponentFixture<ShowlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
