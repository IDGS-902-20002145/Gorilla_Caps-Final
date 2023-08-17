import { TestBed } from '@angular/core/testing';

import { GorillaApiService } from './gorilla-api.service';

describe('GorillaApiService', () => {
  let service: GorillaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GorillaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
