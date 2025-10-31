import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
    standalone: true 

})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) return '';

    // Conversion en objet Date si ce n'est pas déjà le cas
    const date = (value instanceof Date) ? value : new Date(value);

    if (isNaN(date.getTime())) return '';

    // Formatage de la date en jj/mm/aaaa
    const day = date.getDate();
    const month = date.getMonth() + 1; // Janvier est 0!
    const year = date.getFullYear();

    return `${this.padNumber(day)}/${this.padNumber(month)}/${year}`;
  }

  private padNumber(number: number): string {
    if (number < 10) {
      return '0' + number.toString();
    }
    return number.toString();
  }

}
