import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'razonsocialconstructorDataFilter'
})
export class RazonSocialConstructorFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.razonsocialconstructor.indexOf(query) > -1);
        }
        return array;
    }
}