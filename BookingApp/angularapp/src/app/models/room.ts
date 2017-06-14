export class Room {

    bedCount: number;
    description: string;
    id: number;
    pricePerNight: number;
    roomNumber: number;

    m_RoomReservations: number[];
    /*[Required]*/
    Accommodation: number;
    
    constructor(id:number, beds:number, desc:string, price:number, rooms:number, acc:number) {
        this.id = id;
        this.bedCount = beds;
        this.description = desc;
        this.pricePerNight = price;
        this.roomNumber = rooms;
        this.Accommodation = acc;        
    }
}