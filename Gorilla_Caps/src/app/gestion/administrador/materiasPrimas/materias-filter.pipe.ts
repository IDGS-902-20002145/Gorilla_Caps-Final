import { Pipe, PipeTransform } from '@angular/core';
import { InventariomateriaprimaInterface } from 'src/app/interfaces/inventariomateriaprima.interface';

@Pipe({
  name: 'materiasFilter'
})
export class MateriasFilterPipe implements PipeTransform {

  transform(value: InventariomateriaprimaInterface[], args: string): InventariomateriaprimaInterface[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((materia:InventariomateriaprimaInterface)=>
    materia.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}
