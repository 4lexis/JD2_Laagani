import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string, arg1: number) {
        let locval = value;
        if (input) {            
            input = input.toLowerCase();
            locval = locval.filter(function (el: any) {
                return el.Name.toLowerCase().indexOf(input) > -1;
            })
        }

        if(arg1)
        {
           return locval.filter(function (el:any){
               if(arg1 == el.Code)
               {
                   return el.Code;
               }
           })
        }
        return locval;
    }
}