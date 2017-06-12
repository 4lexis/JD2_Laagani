export class Country {
    
    code: number;
    id: number;
    name: string;

    m_Region: number;

    constructor(id:number, code:number, name:string, region:number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.m_Region = region;
    }
}