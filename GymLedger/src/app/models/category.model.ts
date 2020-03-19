export class Category {
    
    private _id: number;
    private _name: string;
    private _description: string;
    

    constructor(){}

        public get name(): string {
            return this._name;
        }
        public set name(value: string) {
            this._name = value;
        }

        public get description(): string {
            return this._description;
        }
        public set description(value: string) {
            this._description = value;
        }
        
        public get id(): number {
            return this._id
        }

        static fromJson(json: any): Category {
            const category = new Category() 

            category._name = json.name;
            category._description = json.description;
            category._id = json.id;

            return category;
        }

}
