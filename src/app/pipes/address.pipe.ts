import { Pipe, PipeTransform } from '@angular/core';
import {Clinic} from '../interfaces/clinics/clinic';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(clinica: Clinic): string {
    let dir =  'Calle ' + clinica.calle +  ' No.' + clinica.numero + ' ' + clinica.cruzamiento
      + ' Colonia ' + clinica.colonia + '.' + clinica.municipio + ',' + clinica.estado
      + ',' + clinica.pais + '. CP.' + clinica.codigo_postal;
    return dir;
  }

}
