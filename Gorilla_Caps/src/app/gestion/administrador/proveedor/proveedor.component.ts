import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { GorillaApiService } from 'src/app/gorilla-api.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {

  dataSource: any = [];
  constructor(public proveedor: GorillaApiService, private aService:AuthService) { }


  ngOnInit(): void {
    
    if(this.aService.getToken() == null){
      window.location.href = "/Login";
    }else{
      this.proveedor.getProveedores().subscribe(
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
