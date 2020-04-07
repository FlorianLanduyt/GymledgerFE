import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastProfileComponent } from './gymnast-profile.component';

describe('GymnastProfileComponent', () => {
  let component: GymnastProfileComponent;
  let fixture: ComponentFixture<GymnastProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnastProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnastProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
