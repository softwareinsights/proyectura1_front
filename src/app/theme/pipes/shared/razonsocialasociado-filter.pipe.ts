import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'razonsocialasociadoDataFilter'
})
export class RazonsocialasociadoFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.razonsocialasociado.indexOf(query) > -1);
        }
        return array;
    }
}