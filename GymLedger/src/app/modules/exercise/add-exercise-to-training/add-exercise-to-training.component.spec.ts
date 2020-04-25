import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseToTrainingComponent } from './add-exercise-to-training.component';

describe('AddExerciseToTrainingComponent', () => {
  let component: AddExerciseToTrainingComponent;
  let fixture: ComponentFixture<AddExerciseToTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseToTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseToTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
