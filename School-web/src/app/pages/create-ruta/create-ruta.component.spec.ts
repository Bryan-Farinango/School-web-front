import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRutaComponent } from './create-ruta.component';

describe('CreateRutaComponent', () => {
  let component: CreateRutaComponent;
  let fixture: ComponentFixture<CreateRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
