import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ProveedorComponent } from './gestion/administrador/proveedor/proveedor.component';
import { UsuariosComponent } from './gestion/administrador/usuarios/usuarios.component';
import { AgregarUsuariosComponent } from './gestion/administrador/usuarios/agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from './gestion/administrador/usuarios/modificar-usuarios/modificar-usuarios.component';
import { EliminarUsuariosComponent } from './gestion/administrador/usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { LoginComponent } from './gestion/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistroComponent } from './gestion/login/registro/registro.component';
import { InventarioComponent } from './gestion/administrador/materiasPrimas/inventario/inventario.component';
import { AgregarMPComponent } from './gestion/administrador/materiasPrimas/agregar-mp/agregar-mp.component';
import { EditarMPComponent } from './gestion/administrador/materiasPrimas/editar-mp/editar-mp.component';
import { EliminarMPComponent } from './gestion/administrador/materiasPrimas/eliminar-mp/eliminar-mp.component';
import { ComprasGETComponent } from './gestion/administrador/compras/compras-get/compras-get.component';
import { ConfirmarComprasComponent } from './gestion/administrador/compras/confirmar-compras/confirmar-compras.component';
import { RegistroComprasComponent } from './gestion/administrador/compras/registro-compras/registro-compras.component';
import { ProductosGetComponent } from './gestion/administrador/productos/productos-get/productos-get.component';
import { AgregarProductosComponent } from './gestion/administrador/productos/agregar-productos/agregar-productos.component';
import { AgregarStockComponent } from './gestion/administrador/productos/agregar-stock/agregar-stock.component';
import { EliminarProductosComponent } from './gestion/administrador/productos/eliminar-productos/eliminar-productos.component';
import { ModificarProductosComponent } from './gestion/administrador/productos/modificar-productos/modificar-productos.component';
import { CatalogoComponent } from './gestion/catalogo/catalogo.component'
import { PedidosComponent } from './gestion/cliente/pedidos/pedidos.component';
import { ProductoDetalleComponent } from './gestion/catalogo/producto-detalle/producto-detalle.component';
import { VentasCComponent } from './gestion/cliente/ventas-c/ventas-c.component';
import { VentasAComponent } from './gestion/administrador/ventas-a/ventas-a.component';
import { FinanzasComponent } from './gestion/administrador/finanzas/finanzas.component';
import { DetalleVentaComponent } from './gestion/administrador/ventas-a/detalle-venta/detalle-venta.component';
import { PagarComponent } from './gestion/cliente/pedidos/pagar/pagar.component';
import { AuthGuardAdmin } from './authAdmin.guart';
import { AuthGuardEmp } from './authEmpleado.guart';




const routes: Routes = [
  { path: 'detalle-venta/:idVenta/:estatus', component: DetalleVentaComponent },
  { path: 'Pagar/:id', component: PagarComponent},
  {
    path: '',
    children: [
      { path: 'Menu', component: MenuComponent },
      { path: 'Proveedor', component: ProveedorComponent , canActivate: [AuthGuardAdmin]},
      { path: 'Usuarios', component: UsuariosComponent , canActivate: [AuthGuardAdmin]},
      { path: 'AgregarUsuarios', component: AgregarUsuariosComponent , canActivate: [AuthGuardAdmin]},
      { path: 'ModificarUsuarios/:id', component: ModificarUsuariosComponent , canActivate: [AuthGuardAdmin]},
      { path: 'EliminarUsuarios/:id', component: EliminarUsuariosComponent , canActivate: [AuthGuardAdmin]},
      { path: 'Login', component: LoginComponent },
      { path: 'Registro', component: RegistroComponent },
      { path: 'MateriasPrimas', component: InventarioComponent, canActivate: [AuthGuardAdmin] },
      { path: 'agregarMP', component: AgregarMPComponent , canActivate: [AuthGuardAdmin]},
      { path: 'editarMP/:id', component: EditarMPComponent , canActivate: [AuthGuardAdmin]},
      { path: 'eliminarMP/:id', component: EliminarMPComponent , canActivate: [AuthGuardAdmin]},
      { path: 'ComprasGet', component: ComprasGETComponent , canActivate: [AuthGuardEmp]},
      { path: 'ConfirmarCompra/:id', component: ConfirmarComprasComponent , canActivate: [AuthGuardEmp]},
      { path: 'registro-compras/:materialId', component: RegistroComprasComponent, canActivate: [AuthGuardAdmin] },
      { path: 'productosGet', component: ProductosGetComponent , canActivate: [AuthGuardEmp]},
      { path: 'agregarProductos', component: AgregarProductosComponent , canActivate: [AuthGuardEmp]},
      { path: 'agregarStock/:id', component: AgregarStockComponent , canActivate: [AuthGuardEmp]},
      { path: 'eliminarProducto/:id', component: EliminarProductosComponent, canActivate: [AuthGuardEmp] },
      { path: 'editarProducto/:id', component: ModificarProductosComponent , canActivate: [AuthGuardEmp]},
      { path: 'Catalogo', component: CatalogoComponent },
      { path: 'Pedidos/:id', component: PedidosComponent },
      { path: 'Catalogo/ProductoDetalle/:id', component: ProductoDetalleComponent },
      { path: 'MisCompras', component: VentasCComponent },
      { path: 'Aprovacion', component: VentasAComponent },
      { path: 'ConfirmarEnvio/:id', component: VentasAComponent },
      { path: 'Finanzas', component: FinanzasComponent , canActivate: [AuthGuardAdmin]},
      { path: '**', redirectTo: '/Login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
