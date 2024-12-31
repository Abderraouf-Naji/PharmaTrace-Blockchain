import { TestBed } from '@angular/core/testing';

import { HederaService } from './hedera.service';

describe('HederaService', () => {
  let service: HederaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HederaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
