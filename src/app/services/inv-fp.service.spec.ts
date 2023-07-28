import { TestBed } from '@angular/core/testing';

import { InvFPService } from './inv-fp.service';

describe('InvFPService', () => {
  let service: InvFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvFPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
