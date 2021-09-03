import { TestBed } from '@angular/core/testing';

import { WinatmService } from './winatm.service';

describe('WinatmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WinatmService = TestBed.get(WinatmService);
    expect(service).toBeTruthy();
  });
});
