import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExercisesListComponent } from './training-exercises-list.component';

describe('TrainingExercisesListComponent', () => {
  let component: TrainingExercisesListComponent;
  let fixture: ComponentFixture<TrainingExercisesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingExercisesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
