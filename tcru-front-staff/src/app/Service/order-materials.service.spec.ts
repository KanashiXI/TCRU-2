import { TestBed } from '@angular/core/testing';

import { OrderMaterialsService } from './order-materials.service';

describe('OrderMaterialsService', () => {
  let service: OrderMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
