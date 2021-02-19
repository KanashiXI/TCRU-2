import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealmComponent } from './revealm.component';

describe('RevealmComponent', () => {
  let component: RevealmComponent;
  let fixture: ComponentFixture<RevealmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevealmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
