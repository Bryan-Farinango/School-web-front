import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeContrasenaComponent } from './mensaje-contrasena.component';

describe('MensajeContrasenaComponent', () => {
  let component: MensajeContrasenaComponent;
  let fixture: ComponentFixture<MensajeContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
