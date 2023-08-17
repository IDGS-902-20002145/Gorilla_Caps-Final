import { Pipe, PipeTransform } from '@angular/core';
import { ProductoInterface } from '../../interfaces/producto.interface';

@Pipe({
  name: 'catalogoFilter'
})
export class CatalogoFilterPipe implements PipeTransform {

  transform(value: ProductoInterface[], args: string): ProductoInterface[] {
    let filter:string=args ?args.toLocaleLowerCase():'';

    return filter? value.filter((prod:ProductoInterface)=>
    prod.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}
