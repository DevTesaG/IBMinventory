import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore'


@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: Timestamp, ...args: unknown[]): unknown {
    return date.toDate().toLocaleDateString().split('/').reverse().join('/').replace(/\//g,'-',);
  }

}
