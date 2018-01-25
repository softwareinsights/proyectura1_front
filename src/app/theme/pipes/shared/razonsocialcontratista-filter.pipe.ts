import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'razonsocialcontratistaDataFilter'
})
export class RazonsocialcontratistaFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.razonsocialcontratista.indexOf(query) > -1);
        }
        return array;
    }
}