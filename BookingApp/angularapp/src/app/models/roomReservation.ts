import { AppUser } from './appUser';
import { Room } from './room';

export class RoomReservation {

    public Id: number;
    private endDate: Date;
    private startDate: Date;
    private timestamp: Date;

    /*[Required]*/
    public User: AppUser;
    /*[Required]*/
    public Room: Room;

    constructor() {

    }
}