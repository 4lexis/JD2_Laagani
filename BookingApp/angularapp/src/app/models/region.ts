export class Region {
   
    id: number;
    name: string;

    m_Place: number[];
    /*[Required]*/
    Country: number;

    constructor(id:number, name:string, country:number) {
        this.id = id;
        this.name = name;
        this.Country = country;
    }
}