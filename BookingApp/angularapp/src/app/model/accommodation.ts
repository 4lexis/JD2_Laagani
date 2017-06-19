import { Place } from './place';
import { AppUser } from './app-user';
import { AccommodationType } from './accommodation-type';
export class Accommodation {

    Address: string;
    Approved: boolean;
    AverageGrade: number;
    Description: string;
    Id: number;
    ImageURL: string;
    Latitude: number;
    Longitude: number;
    Name: string;
    
    Place_Id: number;    
    AppUser_Id: string;    
    AccommodationType_Id: number;

    Place: Place;
    AppUser: AppUser;
    AccommodationType: AccommodationType;
    
    constructor(){}    
}