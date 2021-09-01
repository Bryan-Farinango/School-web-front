import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoginHeaderComponent } from './layout-login-header.component';

describe('LayoutLoginHeaderComponent', () => {
  let component: LayoutLoginHeaderComponent;
  let fixture: ComponentFixture<LayoutLoginHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLoginHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
