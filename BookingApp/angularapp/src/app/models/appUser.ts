import { Comment } from './comment';
import { RoomReservation } from './roomReservation';
import { Accommodation } from './accommodation';

export class AppUser {

    private email: string;
    private id: number;
    private password: string;
    private username: string;
    
    public m_Comment: Comment[];
    public m_RoomReservations: RoomReservation[];
    public m_Accommodation: Accommodation[];
    
    constructor() {
    }
}