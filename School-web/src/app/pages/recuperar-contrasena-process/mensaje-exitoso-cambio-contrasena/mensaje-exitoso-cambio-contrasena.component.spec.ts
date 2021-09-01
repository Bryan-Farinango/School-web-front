import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeExitosoCambioContrasenaComponent } from './mensaje-exitoso-cambio-contrasena.component';

describe('MensajeExitosoCambioContrasenaComponent', () => {
  let component: MensajeExitosoCambioContrasenaComponent;
  let fixture: ComponentFixture<MensajeExitosoCambioContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeExitosoCambioContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeExitosoCambioContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
