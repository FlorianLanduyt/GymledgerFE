import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() public e: Exercise;
  @Output() public exerciseId = new EventEmitter<number>()

  @Input() public addForm: boolean = false;
  public imgSrc: string = "assets/icons/hammer_cheat_curl_main.jpg"

  public exerciseFg: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  AddExercise() {
     this.exerciseId.emit(this.e.id);
  }

  initForm(){
    this.exerciseFg = this.fb.group({
      name: ['']
    })
  }

}
