import { ExerciseEvaluation } from './exerciseEvaluation.model';

export class Exercise {
    private _id: number;
    private _description: string;
    private _image: string;
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
    public get image(): string {
        return this._image;
    }
    

    public set id(value: number) {
        this._id = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    public set image(value: string) {
        this._image = value;
    }
  


    static fromJson(json: any): Exercise {
        const t = new Exercise ()
        t._description = json.description;
        t._id = json.id;
        t._image = json.image;
        return t;
    }

    toJson(): any{
        return {
            description: this._description
            
        }
    }



    
}