import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'ALL') {return value; }

   return value.filter(coin => {
      if (args === 'Positive') {
        return coin.percent_change_24h > 0;
      } else {
        return coin.percent_change_24h < 0;
      }
    });
  }

}
