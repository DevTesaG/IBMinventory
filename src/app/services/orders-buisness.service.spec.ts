import { TestBed } from '@angular/core/testing';

import { OrdersBuisnessService } from './orders-buisness.service';

describe('OrdersBuisnessService', () => {
  let service: OrdersBuisnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersBuisnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
