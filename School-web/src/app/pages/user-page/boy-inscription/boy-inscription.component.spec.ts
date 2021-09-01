import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoyInscriptionComponent } from './boy-inscription.component';

describe('BoyInscriptionComponent', () => {
  let component: BoyInscriptionComponent;
  let fixture: ComponentFixture<BoyInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoyInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoyInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
