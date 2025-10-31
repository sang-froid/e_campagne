import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: 'cleanSpaces',
        standalone: true

    })
export class CleanSpacesPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        return value.replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ');
    }
}
