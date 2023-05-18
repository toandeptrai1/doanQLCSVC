import { TestBed } from '@angular/core/testing';

import { ThanhlyService } from './thanhly.service';

describe('ThanhlyService', () => {
  let service: ThanhlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThanhlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
