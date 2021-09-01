import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoginFooterComponent } from './layout-login-footer.component';

describe('LayoutLoginFooterComponent', () => {
  let component: LayoutLoginFooterComponent;
  let fixture: ComponentFixture<LayoutLoginFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLoginFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
