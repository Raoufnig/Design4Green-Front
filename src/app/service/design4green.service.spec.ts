import { TestBed } from '@angular/core/testing';

import { Design4greenService } from './design4green.service';

describe('Design4greenService', () => {
  let service: Design4greenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Design4greenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
