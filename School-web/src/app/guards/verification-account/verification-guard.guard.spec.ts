import { TestBed } from '@angular/core/testing';

import { VerificationGuardGuard } from './verification-guard.guard';

describe('VerificationGuardGuard', () => {
  let guard: VerificationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
