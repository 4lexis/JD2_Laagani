import { AppUser } from './appUser';
import { Accommodation } from './accommodation';

export class Comment {

    public Id: number;
    private grade: number;
    private text: string;

    /*[Required]*/
    public User: AppUser;
    /*[Required]*/
    public Accommodation: Accommodation;
    
    constructor() {

    }
}