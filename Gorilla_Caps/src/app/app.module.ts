import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProveedorComponent } from './gestion/administrador/proveedor/proveedor.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './gestion/administrador/usuarios/usuarios.component';
import { AgregarUsuariosComponent } from './gestion/administrador/usuarios/agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from './gestion/administrador/usuarios/modificar-usuarios/modificar-usuarios.component';
import { EliminarUsuariosComponent } from './gestion/administrador/usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LoginComponent } from './gestion/login/login.component';
import { AuthService } from './auth.service';
import { RegistroComponent } from './gestion/login/registro/registro.component';
import { CatalogoFilterPipe } from './gestion/catalogo/catalogo-filter.pipe';
import { UsuariosFilterPipe } from './gestion/administrador/usuarios/usuarios-filter.pipe';
import { AgregarMPComponent } from './gestion/administrador/materiasPrimas/agregar-mp/agregar-mp.component';
import { EditarMPComponent } from './gestion/administrador/materiasPrimas/editar-mp/editar-mp.component';
import { EliminarMPComponent } from './gestion/administrador/materiasPrimas/eliminar-mp/eliminar-mp.component';
import { MateriasFilterPipe } from './gestion/administrador/materiasPrimas/materias-filter.pipe';
import { InventarioComponent } from './gestion/administrador/materiasPrimas/inventario/inventario.component';
import { ComprasGETComponent } from './gestion/administrador/compras/compras-get/compras-get.component';
import { RegistroComprasComponent } from './gestion/administrador/compras/registro-compras/registro-compras.component';
import { ConfirmarComprasComponent } from './gestion/administrador/compras/confirmar-compras/confirmar-compras.component';
import { AgregarProductosComponent } from './gestion/administrador/productos/agregar-productos/agregar-productos.component';
import { AgregarStockComponent } from './gestion/administrador/productos/agregar-stock/agregar-stock.component';
import { EliminarProductosComponent } from './gestion/administrador/productos/eliminar-productos/eliminar-productos.component';
import { ModificarProductosComponent } from './gestion/administrador/productos/modificar-productos/modificar-productos.component';
import { ProductosGetComponent } from './gestion/administrador/productos/productos-get/productos-get.component';
import { CatalogoComponent } from './gestion/catalogo/catalogo.component';
import { PedidosComponent } from './gestion/cliente/pedidos/pedidos.component';
import { ProductoDetalleComponent } from './gestion/catalogo/producto-detalle/producto-detalle.component';
import { Routes, RouterModule } from '@angular/router';
import { VentasAComponent } from './gestion/administrador/ventas-a/ventas-a.component';
import { VentasCComponent } from './gestion/cliente/ventas-c/ventas-c.component';
import { DetalleVentaComponent } from './gestion/administrador/ventas-a/detalle-venta/detalle-venta.component';
import { FinanzasComponent } from './gestion/administrador/finanzas/finanzas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { PagarComponent } from './gestion/cliente/pedidos/pagar/pagar.component';
import { PTarjetaComponent } from './gestion/cliente/pedidos/p-tarjeta/p-tarjeta.component';
import { PAllComponent } from './gestion/cliente/pedidos/p-all/p-all.component';
import { TAllComponent } from './gestion/cliente/pedidos/t-all/t-all.component';


@NgModule({
  declarations: [
    AppComponent,
    ProveedorComponent,
    InventarioComponent,
    MenuComponent,
    UsuariosComponent,
    AgregarUsuariosComponent,
    ModificarUsuariosComponent,
    EliminarUsuariosComponent,
    LoginComponent,
    RegistroComponent,
    AgregarMPComponent,
    EditarMPComponent,
    EliminarMPComponent,
    ComprasGETComponent,
    RegistroComprasComponent,
    ConfirmarComprasComponent,
    ProductosGetComponent,
    AgregarProductosComponent,
    AgregarStockComponent,
    EliminarProductosComponent,
    ModificarProductosComponent,
    MateriasFilterPipe,
    UsuariosFilterPipe,
    CatalogoFilterPipe,
    CatalogoComponent,
    PedidosComponent,
    ProductoDetalleComponent,
    VentasAComponent,
    VentasCComponent,
    DetalleVentaComponent,
    FinanzasComponent,
    PagarComponent,
    PTarjetaComponent,
    PAllComponent,
    TAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    RouterModule,
    CommonModule,
    NgxChartsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
