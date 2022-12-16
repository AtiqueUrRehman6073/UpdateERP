import { TestBed } from '@angular/core/testing';

import { GlobalSerivceService } from './global-serivce.service';

describe('GlobalSerivceService', () => {
  let service: GlobalSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
