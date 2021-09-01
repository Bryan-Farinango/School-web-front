import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesFirebaseComponent } from './acciones-firebase.component';

describe('AccionesFirebaseComponent', () => {
  let component: AccionesFirebaseComponent;
  let fixture: ComponentFixture<AccionesFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesFirebaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
