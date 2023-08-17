import { Component, OnInit } from '@angular/core';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-productos-get',
  templateUrl: './productos-get.component.html',
  styleUrls: ['./productos-get.component.css']
})
export class ProductosGetComponent implements OnInit{
  products: ProductoInterface[] = [];
  isCardView: boolean = true; // Inicialmente mostrar la vista en cards

  constructor(private productService: GorillaApiService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductos().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleView() {
    this.isCardView = !this.isCardView;
  }
  // Método para convertir la imagen Base64 a un objeto URL
  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
  }
}
