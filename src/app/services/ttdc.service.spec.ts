import { TestBed } from '@angular/core/testing';

import { TtdcService } from './ttdc.service';

describe('TtdcService', () => {
  let service: TtdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
