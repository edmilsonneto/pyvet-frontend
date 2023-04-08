import { TestBed } from '@angular/core/testing';

import { PyvetService } from './pyvet.service';

describe('PyvetService', () => {
  let service: PyvetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PyvetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
