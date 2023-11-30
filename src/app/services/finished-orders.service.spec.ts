import { TestBed } from '@angular/core/testing';

import { FinishedOrdersService } from './finished-orders.service';

describe('FinishedOrdersService', () => {
  let service: FinishedOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishedOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
