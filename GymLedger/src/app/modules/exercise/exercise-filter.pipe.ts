import { Pipe, PipeTransform } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';

@Pipe({
  name: 'exerciseFilter'
})
export class ExerciseFilterPipe implements PipeTransform {

  transform(exercises: Exercise[], name: string): Exercise[]{
    if (!name || name.length === 0) {
      return exercises;
    }
    return exercises.filter(ex =>
      ex.description.toLowerCase().startsWith(name.toLowerCase())
    );
  }

}
