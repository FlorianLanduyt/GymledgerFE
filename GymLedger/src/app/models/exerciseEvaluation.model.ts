import { Exercise } from './exercise.model';
import { Training } from './training.model';

export class ExerciseEvaluation {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _difficultyScore: number;
    public get difficultyScore(): number {
        return this._difficultyScore;
    }
    public set difficultyScore(value: number) {
        this._difficultyScore = value;
    }
    private _note: string;
    public get note(): string {
        return this._note;
    }
    public set note(value: string) {
        this._note = value;
    }
    private _series: number;
    public get series(): number {
        return this._series;
    }
    public set series(value: number) {
        this._series = value;
    }
    private _weight: number;
    public get weight(): number {
        return this._weight;
    }
    public set weight(value: number) {
        this._weight = value;
    }
    private _repetitions: number;
    public get repetitions(): number {
        return this._repetitions;
    }
    public set repetitions(value: number) {
        this._repetitions = value;
    }

    private _training: Training;
    public get training(): Training {
        return this._training;
    }
    public set training(value: Training) {
        this._training = value;
    }
    
    // private _exercise: Exercise;
    // public get exercise(): Exercise {
    //     return this._exercise;
    // }
    // public set exercise(value: Exercise) {
    //     this._exercise = value;
    // }

    static fromJson(json: any): ExerciseEvaluation {
        const t = new ExerciseEvaluation()

        t._difficultyScore = json.difficultyScore
        t._note = json.note;
        t._series = json.series
        t._weight = json.weight
        t._repetitions = json.repetitions;
        t._id = json.id;
        
        // t._training = Training.fromJson(json.training)
        // t._exercise = Exercise.fromJson(json.exercise)

        return t;
    }
    

    toJson(): any{
        return {
            feelingOfExercise: this._difficultyScore,
            note: this.note,
            sets: this._series,
            weight: this._weight,
            repetitions: this._repetitions,
        }
    }

    toJsonEdit(): any {
        return {
            id: this._id,
            feelingOfExercise: this._difficultyScore,
            note: this.note,
            sets: this._series,
            weight: this._weight,
            repetitions: this._repetitions,
        }
    }


}