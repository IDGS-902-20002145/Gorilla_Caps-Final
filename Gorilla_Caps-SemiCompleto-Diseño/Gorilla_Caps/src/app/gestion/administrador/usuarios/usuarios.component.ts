import { Component } from '@angular/core';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { UsuariosFilterPipe } from './usuarios-filter.pipe';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  listFilter:string='';
  dataSource: any = [];
  constructor(public user: GorillaApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      window.location.href = "/Login";
    }else{
    this.user.getUsers().subscribe(
      {
        next: response => {
          this.dataSource = response;
        },
        error: error => console.log(error)
      }
    );
  }
  }
}
