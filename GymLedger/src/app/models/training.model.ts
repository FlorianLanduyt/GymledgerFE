export class Training {
    
private _id: number;

    constructor(
        private _category: number, 
        private _date: Date,
        private _feelingBefore: string, 
        private _feelingAfter: string 
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
    public get category(): number {
        return this._category;
    }
    public set category(value: number) {
        this._category = value;
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
}