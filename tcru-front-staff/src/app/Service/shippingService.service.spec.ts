/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShippingServiceService } from './shippingService.service';

describe('Service: ShippingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingServiceService]
    });
  });

  it('should ...', inject([ShippingServiceService], (service: ShippingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
