import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtaxComponent } from './showtax.component';

describe('ShowtaxComponent', () => {
  let component: ShowtaxComponent;
  let fixture: ComponentFixture<ShowtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
