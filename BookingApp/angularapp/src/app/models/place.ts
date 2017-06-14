export class Place {
    
    id: number;
    name: string;
    
    m_Accommodation: number[];
    /*[Required]*/
    Region: number;
    
    constructor(id:number, name:string, region:number) {
        this.id = id;
        this.name = name;
        this.Region = region;
    }
}