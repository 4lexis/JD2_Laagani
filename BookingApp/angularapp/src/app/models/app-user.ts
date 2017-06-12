export class AppUser {
    
    email: string;
    id: number;
    password: string;
    username: string;
    
    m_Comment: number[];
    m_RoomReservations: number[];
    m_Accommodation: number[];
    
    constructor(id:number, email:string, pass:string, user:string) {
        this.id = id;
        this.email = email;
        this.password = pass;
        this.username = user;
    }
}