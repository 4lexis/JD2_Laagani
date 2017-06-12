import { AccommodationType } from "./accommodationType";
import { Place } from "./place";
import { Room } from "./room";
import { Comment } from "./comment";
import { AppUser } from "./appUser";

export class Accommodation {

    private address: string;
    private approved: boolean;
    private averageGrade: number;
    private description: string;
    private id: number;
    private imageURL: string;
    private latitude: number;
    private longitude: number;
    private name: string;

    public m_Comment: Comment[];
    public m_Room: Room[];
    /*[Required]*/
    public Place: Place;
    /*[Required]*/
    public User: AppUser;
    /*[Required]*/
    public AType: AccommodationType;
    
    constructor() {
    }
}