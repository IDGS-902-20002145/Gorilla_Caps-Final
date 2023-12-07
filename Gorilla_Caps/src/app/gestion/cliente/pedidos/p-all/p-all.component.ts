import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GorillaApiService } from 'src/app/gorilla-api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-p-all',
  templateUrl: './p-all.component.html',
  styleUrls: ['./p-all.component.css']
})
export class PAllComponent implements OnInit {
  idUsuario: number = 0;
  detProductos: any = [];
  pedidos: any = [];
  total: number = 0;
  metodoPago: string = '';

  constructor(private pagarAll: GorillaApiService, private aService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idUsuario = Number(localStorage.getItem('id'));
    console.log(this.idUsuario);
    this.getPagarTodo();
  }

  getImageUrl(base64Image: string): string {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    // Puedes establecer una imagen de relleno en caso de que no haya imagen
    return './assets/default.jpg';
  }


  getPagarTodo() {
    this.pagarAll.getpagarTodo(this.idUsuario).subscribe(
      (response: any) => {
        console.log(response);
        this.detProductos = response.detProductos;
        this.pedidos = response.pedidos;
        this.total = response.total;
        console.log(this.detProductos);
        console.log(this.pedidos);
        console.log(this.total);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron obtener los articulos en el carrito',
          confirmButtonText: 'Aceptar',
        });
        console.log(error);
      });
  }

  pagarTodo() {
    if (this.metodoPago === 'efectivo') {
      this.pagarAll.postpagarTodo(this.idUsuario).subscribe(
        (response: any) => {
          const ArticuloData = this.detProductos;
          const total = this.total;
          const detalles = [
            [
              { text: 'Producto', style: 'header' },
              { text: 'Precio Unitario', style: 'header' },
              { text: 'Cantidad', style: 'header' },
            ],
            ...ArticuloData.map((producto: any) => [

              producto.nombre,
              producto.precio,
              producto.cantidad
            ])
          ];

          const docDefinition: TDocumentDefinitions = {
            content: [
              {
                image: "",
                width: 300,
                height: 150,
                alignment: 'center' // Alinea la imagen en el centro
              },
              {
                text: 'Gorilla Caps Referencia de Pago',
                style: 'title'
              },
              {
                text: `Fecha de Impresión: ${new Date().toLocaleDateString('es-ES')}`,
                style: 'normal'
              },
              {
                text: "Referencia #1234567890",
                style: 'negrita'
              },
              {
                text: "Cuenta Bancaria: 8675309012345",
                style: 'normal'
              },
              {
                text: "Titular de la cuenta: Gorilla Caps",
                style: 'normal'
              },
              {
                table: {
                  widths: ['auto', 'auto', 'auto'],
                  body: detalles
                },
              },
              {
                text: `Total de ventas: ${total}`,
                style: 'negrita'
              }
            ],
            styles: {
              title: {
                fontSize: 20,
                bold: true,
                alignment: 'center'
              },
              normal: {
                fontSize: 12,
                alignment: 'right'
              },
              negrita: {
                fontSize: 14,
                bold: true
              },
              header: {
                fontSize: 14,
                bold: true,
                fillColor: '#f2f2f2'
              }
            } as any // Cambiamos el tipo de 'styles' a 'any'
          };

          pdfMake.createPdf(docDefinition).download(`Ticket_${new Date().toLocaleDateString('es-ES')}.pdf`);
          Swal.fire({
            icon: 'success',
            title: 'Pago realizado con éxito',
            text: 'Se ha generado el recibo de pago',

          });
          this.router.navigate(['/Catalogo']);

        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo realizar el pago',
            confirmButtonText: 'Aceptar',
          });
          console.log(error);
        });
    }
    else if(this.metodoPago === 'tarjeta')
    {
      const stateObject = {
        detProductos: this.detProductos,
        total: this.total
      };
      this.router.navigate([`/PagarTTarjeta`], {state: stateObject});
    }
  }


}
