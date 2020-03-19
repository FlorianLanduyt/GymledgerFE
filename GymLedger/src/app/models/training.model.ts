import { Category } from './category.model';

export class Training {
    
    
    private _id: number;
    private _feelingAfter: string;
    private _amountOfExercises: number
    private _category: Category;
    private _date: Date;
    private _feelingBefore: string;

    constructor( 
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
            categoryId: this.category.id,
            day: this.date,
            beforeFeeling: this.feelingBefore,
            afterFeeling: this.feelingAfter,
            
        }
    }

    static fromJson(json: any): Training {
        const t = new Training (
            // json.amountOfExercises
        )
        t._category = Category.fromJson(json.category)
        t._date = json.date;
        t._feelingBefore = json.feelingBeforeTraining
        t._feelingAfter = json.feelingAfterTraining
        t._id = json.id;

        return t;
    }
}