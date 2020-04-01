import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingButtonComponent } from './add-training-button.component';

describe('AddTrainingComponent', () => {
  let component: AddTrainingButtonComponent;
  let fixture: ComponentFixture<AddTrainingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
