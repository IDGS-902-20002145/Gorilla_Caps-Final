import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Pipe({
  name: 'usuariosFilter'
})
export class UsuariosFilterPipe implements PipeTransform {

  transform(value: UserInterface[], args: string): UserInterface[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((user:UserInterface)=>
    user.name.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}