import { Pipe, PipeTransform } from '@angular/core';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';


@Pipe({
  name: 'proveedoresFilter'
})
export class ProveedoresFilterPipe implements PipeTransform {

  transform(value: ProveedorInterface[], args: string): ProveedorInterface[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((proveedor:ProveedorInterface)=>
    proveedor.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}
