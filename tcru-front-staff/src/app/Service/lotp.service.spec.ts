import { TestBed } from '@angular/core/testing';

import { LotpService } from './lotp.service';

describe('LotpService', () => {
  let service: LotpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
