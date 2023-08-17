import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  dataSource: any = [];
  listFilter:string='';
  constructor(private inventario: GorillaApiService, private router: Router) { }


  ngOnInit(): void {
    this.inventario.getMateriasPrimas().subscribe(
      {
        next: response => {
          this.dataSource = response;
        },
        error: error => console.log(error)
      }
    );
  }
  comprarMaterial(materialId: number): void {
    this.router.navigate(['registro-compras', materialId]);
  }
}
