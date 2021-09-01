import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransporteComponent } from './user-transporte.component';

describe('UserTransporteComponent', () => {
  let component: UserTransporteComponent;
  let fixture: ComponentFixture<UserTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
