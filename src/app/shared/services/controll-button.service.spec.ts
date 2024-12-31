import { TestBed } from '@angular/core/testing';

import { ControllButtonService } from './controll-button.service';

describe('ControllButtonService', () => {
  let service: ControllButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
