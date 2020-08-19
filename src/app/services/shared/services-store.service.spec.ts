import { TestBed } from '@angular/core/testing';

import { ServicesStoreService } from './services-store.service';

describe('ServicesStoreService', () => {
  let service: ServicesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
