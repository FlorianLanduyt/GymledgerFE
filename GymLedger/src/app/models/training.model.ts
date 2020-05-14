import { Category } from './category.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Exercise } from './exercise.model';

export class Training {
    
    
    private _id: number;
    private _feelingAfterTraining: string;
    private _amountOfExercises: number
    private _category?: Category;
    private _date: Date;
    private _feelingBeforeTraining: string;
    private _day: string;
    private _exercises: Exercise[];
  


    public get day(): string {
        return this._day;
    }
    public set day(value: string) {
        this._day = value;
    }

    public get feelingAfterTraining(): string {
        return this._feelingAfterTraining;
    }
    public set feelingAfterTraining(value: string) {
        if(this.isNan(value)){
            this._feelingAfterTraining == "0"
        } else {
            this._feelingAfterTraining = value
        }
    }

    private isNan(value: string): boolean {
        return (value === ""? true: false)
    }

    public get feelingBeforeTraining(): string {
        return this._feelingBeforeTraining;
    }

    public set feelingBeforeTraining(value: string) {
        if(this.isNan(value)){
            this._feelingBeforeTraining = "0"
        } else {
            this._feelingBeforeTraining = value;
        }
    }
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public get category(): Category {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }

    public get amountOfExercises(): number {
        return this._amountOfExercises;
    }
    public set amountOfExercises(value: number) {
        this._amountOfExercises = value;
    }

    public get id(): number {
        return this._id;
    }

    public get exercises(): Exercise[] {
        return this._exercises;
    }
    public set exercises(value: Exercise[]) {
        this._exercises = value;
    }

    toJson(): any{
        return {
            id: this._id,
            categoryId: this.category.id,
            category: this.category.name,
            date: this.date,
            feelingBeforeTraining: this.feelingBeforeTraining,
            feelingAfterTraining: this.feelingAfterTraining,
        }
    }

    toJsonEdit(): any {
        return {
            trainingId: this._id,
            categoryId: this.category.id,
            date: this.date,
            feelingBeforeTraining: this.feelingBeforeTraining,
            feelingAfterTraining: this.feelingAfterTraining,
        }
    }

    static fromJson(json: any): Training {
        const t = new Training (
            // json.amountOfExercises
        )
        t._category = Category.fromJson(json.category)
         t._date = json.date
         //t._date = new Date(parseInt(json.date.substr(6)));

        t._feelingBeforeTraining = json.feelingBeforeTraining
        t._feelingAfterTraining = json.feelingAfterTraining
        t._id = json.id;
        t._day = json.day;
        t._exercises = json.trainingExercises.map(te => Exercise.fromJson(te.exercise))

        return t;
    }
}