import { TestBed } from '@angular/core/testing';

import { OperadorGuard } from './operador.guard';

describe('OperadorGuard', () => {
  let guard: OperadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OperadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
