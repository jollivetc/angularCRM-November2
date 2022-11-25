import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === null) return null;
    let phone = value as string;
    return phone.replace(/([0-9]{2})/g, "$1 ").trim()
  }

}
