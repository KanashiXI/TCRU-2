import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittaxComponent } from './edittax.component';

describe('EdittaxComponent', () => {
  let component: EdittaxComponent;
  let fixture: ComponentFixture<EdittaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
