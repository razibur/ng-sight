import { TestBed, inject } from '@angular/core/testing';

import { SalesDataServiceService } from './sales-data-service.service';

describe('SalesDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesDataServiceService]
    });
  });

  it('should be created', inject([SalesDataServiceService], (service: SalesDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
