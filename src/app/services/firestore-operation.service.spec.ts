import { TestBed } from '@angular/core/testing';

import { FirestoreOperationService } from './firestore-operation.service';

describe('FirestoreOperationService', () => {
  let service: FirestoreOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
