import { Place } from './place';
import { Country } from './country';

export class Region {
   
    private id: number;
    private name: string;

    public m_Place: Place[];
    /*[Required]*/
    public Country: Country;

    constructor() {
    }
}