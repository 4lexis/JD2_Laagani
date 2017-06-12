export class RoomReservation {

    id: number;
    endDate: Date;
    startDate: Date;
    timestamp: Date;

    /*[Required]*/
    User: number;
    /*[Required]*/
    Room: number;

    constructor(id:number, endData:Date, starDate:Date, timestamp:Date, user:number, room:number) {
        this.id = id;
        this.endDate = endData;
        this.startDate = starDate;
        this.timestamp = timestamp;
        this.User = user;
        this.Room = room;
    }
}