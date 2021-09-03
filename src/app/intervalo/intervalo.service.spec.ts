import { TestBed } from '@angular/core/testing';

import { IntervaloService } from './intervalo.service';

describe('IntervaloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntervaloService = TestBed.get(IntervaloService);
    expect(service).toBeTruthy();
  });
});
