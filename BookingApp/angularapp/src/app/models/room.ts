import { RoomReservation } from './roomReservation';
import { Accommodation } from './accommodation';

export class Room {

    private bedCount: number;
    private description: string;
    private id: number;
    private pricePerNight: number;
    private roomNumber: number;

    public m_RoomReservations: RoomReservation[];
    /*[Required]*/
    public Accommodation: Accommodation;
    
    constructor() {
        
    }
}