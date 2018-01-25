import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'razonsocialclienteDataFilter'
})
export class RazonsocialclienteFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.razonsocialcliente.indexOf(query) > -1);
        }
        return array;
    }
}