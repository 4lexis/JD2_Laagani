import { Accommodation } from './accommodation';
export class Room {

    Id: number;
    BedCount: number;
    Description: string;    
    PricePerNight: number;
    RoomNumber: number;    
    Free: boolean;
    
    Accommodation_Id: number;
    Accommodation: Accommodation;
    
    constructor(){}
}