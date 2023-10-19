import { TestBed } from '@angular/core/testing';

import { PointOfSalesCrudService } from './point-of-sales-crud.service';

describe('CrudService', () => {
  let service: PointOfSalesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointOfSalesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
