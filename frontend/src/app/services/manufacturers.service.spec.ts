import { TestBed } from '@angular/core/testing';

import { ManufacturersService } from './manufacturers.service';

describe('ManufacturersService', () => {
  let service: ManufacturersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
