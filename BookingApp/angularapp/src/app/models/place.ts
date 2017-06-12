import { Accommodation } from './accommodation';
import { Region } from './region';

export class Place {
    
    private id: number;
    private name: string;
    
    public m_Accommodation: Accommodation[];
    /*[Required]*/
    public Region: Region;
    
    constructor() {
    }
}