import { TestBed } from '@angular/core/testing';

import { InvRMService } from './inv-rm.service';

describe('InvRMService', () => {
  let service: InvRMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvRMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
