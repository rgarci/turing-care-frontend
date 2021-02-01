import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class DateToAgePipe implements PipeTransform {

  transform(birthday) : number {
      let today = new Date();
      let birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
  }

}
