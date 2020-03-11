import { Category } from './category.enum';

export class Training {
    
    
private _id: number;

    constructor(
        private _category: Category, 
        private _date: Date,
        private _feelingBefore: string, 
        private _feelingAfter: string,
        private _amountOfExercises: number
    ){}

    public get feelingAfter(): string {
        return this._feelingAfter;
    }
    public set feelingAfter(value: string) {
        this._feelingAfter = value;
    }
    public get feelingBefore(): string {
        return this._feelingBefore;
    }
    public set feelingBefore(value: string) {
        this._feelingBefore = value;
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

    toJson(): any{
        return {
            id: this._id,
            kind: this.category,
            date: this.date,
            feelingBeforeTraining: this.feelingBefore,
            feelAfterTraining: this.feelingAfter,
            
        }
    }

    static fromJson(json: any): Training {
        const t = new Training (
            json.kind,
            json.date,
            json.feelingBeforeTraining,
            json.feelAfterTraining,
            json.amountOfExercises
        )

        t._id = json.id;

        return t;
    }
}