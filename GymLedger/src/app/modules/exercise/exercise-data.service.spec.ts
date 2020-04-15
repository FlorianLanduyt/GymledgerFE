import { TestBed } from '@angular/core/testing';

import { ExerciseDataService } from './exercise-data.service';

describe('ExerciseDataService', () => {
  let service: ExerciseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
