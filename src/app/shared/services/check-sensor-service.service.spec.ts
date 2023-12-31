import { TestBed } from '@angular/core/testing';

import { CheckSensorServiceService } from './check-sensor-service.service';

describe('CheckSensorServiceService', () => {
  let service: CheckSensorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckSensorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
