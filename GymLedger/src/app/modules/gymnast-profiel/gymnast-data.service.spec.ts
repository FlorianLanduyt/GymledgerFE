import { TestBed } from '@angular/core/testing';

import { GymnastDataService } from './gymnast-data.service';

describe('GymnastDataService', () => {
  let service: GymnastDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymnastDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
