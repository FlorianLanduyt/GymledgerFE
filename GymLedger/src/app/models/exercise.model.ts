import { ExerciseEvaluation } from './exerciseEvaluation.model';

export class Exercise {
    private _id: number;
    private _description: string;
    private _amount: number;
    private _image: string;
    private _weight: number;
    private _exerciseEvaluation?: ExerciseEvaluation;

    
    public get exerciseEvaluation(): ExerciseEvaluation {
        return this._exerciseEvaluation;
    }
    public set exerciseEvaluation(value: ExerciseEvaluation) {
        this._exerciseEvaluation = value;
    }

    public get id(): number {
        return this._id;
    }
    public get description(): string {
        return this._description;
    }
    public get amount(): number {
        return this._amount;
    }
    public get image(): string {
        return this._image;
    }
    public get weight(): number {
        return this._weight;
    }

    public set id(value: number) {
        this._id = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    public set amount(value: number) {
        this._amount = value;
    }
    public set image(value: string) {
        this._image = value;
    }
    public set weight(value: number) {
        this._weight = value;
    }


    static fromJson(json: any): Exercise {
        const t = new Exercise ()
        t._amount = json.number;
        t._description = json.description;
        t._id = json.id;
        t._weight = json.weight;
        t._image = json.image;


        return t;
    }

    
}