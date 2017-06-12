export class Accommodation {

    address: string;
    approved: boolean;
    averageGrade: number;
    description: string;
    id: number;
    imageURL: string;
    latitude: number;
    longitude: number;
    name: string;

    m_Comment: number[];
    m_Room: number[];
    /*[Required]*/
    Place: number;
    /*[Required]*/
    User: number;
    /*[Required]*/
    AType: number;
    
    constructor(id:number, address:string, name:string, appr:boolean, grade:number, desc:string,
        img:string, lat:number, lon:number, place:number, user:number, atype:number) {
            this.id = id;
            this.address = address;
            this.name = name;
            this.approved = appr;
            this.averageGrade = grade;
            this.description = desc;
            this.imageURL = img;
            this.latitude = lat;
            this.longitude = lon;
            this.Place = place;
            this.User = user;
            this.AType = atype;
    }
}