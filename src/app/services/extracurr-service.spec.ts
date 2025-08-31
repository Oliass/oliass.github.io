import { TestBed } from '@angular/core/testing';

import { ExtracurrService } from './extracurr-service';

describe('ExtracurrService', () => {
  let service: ExtracurrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtracurrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
