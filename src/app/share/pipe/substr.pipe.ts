import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})
export class SubstrPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toString().substr(0, 5);
  }

}
