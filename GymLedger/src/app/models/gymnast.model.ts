import { Training } from "./training.model";

export class Gymnast {
    private _id: number;

    constructor(
        private _firstname: string,
        private _lastname: string,
        private _email: string,
        private _birthday: Date,
        private _trainings: Training[]
    ) { }

    public get trainings(): Training[] {
        return this._trainings;
    }
    public set trainings(value: Training[]) {
        this._trainings = value;
    }
    public get birthday(): Date {
        return this._birthday;
    }
    public set birthday(value: Date) {
        this._birthday = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }

    public get id(): number{
        return this._id
    }

    toJson(): any {
        return {
            id: this._id,
            firstName: this.firstname,
            lastName: this.lastname,
            birthDate: this.birthday,
            email: this.email,
            trainings: this.trainings.map(training => training.toJson())
        }
    }

    static fromJson(json: any): Gymnast {
        console.log(json.trainings)
        const g = new Gymnast(
            json.firstname, 
            json.lastname,
            json.birthDate,
            json.email,
            json.trainings.map(t => Training.fromJson(t)));

        g._id = json.id;

        return g;
    } 

}