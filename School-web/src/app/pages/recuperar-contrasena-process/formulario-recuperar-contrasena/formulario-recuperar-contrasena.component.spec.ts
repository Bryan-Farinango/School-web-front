import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecuperarContrasenaComponent } from './formulario-recuperar-contrasena.component';

describe('FormularioRecuperarContrasenaComponent', () => {
  let component: FormularioRecuperarContrasenaComponent;
  let fixture: ComponentFixture<FormularioRecuperarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRecuperarContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
