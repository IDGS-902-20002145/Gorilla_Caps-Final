import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorInterface } from './interfaces/proveedor.interface';
import { UserInterface } from './interfaces/user.interface';
import { AuthService } from './auth.service';
import { InventariomateriaprimaInterface } from './interfaces/inventariomateriaprima.interface';
import { Compra } from './interfaces/compra.interface';
import { CompraGET } from './interfaces/compraGET.interface';
import { ProductoInterface } from './interfaces/producto.interface';
import { FullPedidoInterface } from './interfaces/fullPedido.interface';
import { VentaInterface } from './interfaces/venta.interface';
import { DetventaInterface } from './interfaces/detventa.interface';

@Injectable({
  providedIn: 'root'
})
export class GorillaApiService {

  constructor(private http: HttpClient, private aService:AuthService) { }

  public getProveedores(): Observable<ProveedorInterface[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProveedorInterface[]>('/api/Proveedor', { headers });
  }

  public addProveedor(proveedor: ProveedorInterface): Observable<ProveedorInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ProveedorInterface>('/api/Proveedor/Add', proveedor, { headers })
  }

  public updateProveedor(proveedor: ProveedorInterface): Observable<ProveedorInterface> {
    let url = `/api/Proveedor/${proveedor.id}`;
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ProveedorInterface>(url, proveedor, { headers })
  }
  public findProveedor(id: number): Observable<ProveedorInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProveedorInterface>(`/api/Proveedor/${id}`, { headers })
  }

  public getUsers(): Observable<UserInterface[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserInterface[]>('/api/User', { headers });
  }

  public findUser(id: number): Observable<UserInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserInterface>(`/api/User/${id}`, { headers })
  }

  public addUser(user: UserInterface): Observable<UserInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UserInterface>('/api/User', user, { headers })
  }

  public updateUser(user: UserInterface): Observable<UserInterface> {
    let url = `/api/User/${user.id}`;
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<UserInterface>(url, user, { headers })
  }

  public login(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`/api/Login/${id}`)
  }
  public findBy_UsernamePassword(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(`/api/Login/authenticate`, {email, password})
  }
  public loginRegister(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`/api/Login/Registrar`, user)
  }
  public getMateriasPrimas(): Observable<InventariomateriaprimaInterface[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<InventariomateriaprimaInterface[]>('/api/MateriasPrimas', { headers })
  }

  public getMateriasPrimasById(id: number): Observable<InventariomateriaprimaInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<InventariomateriaprimaInterface>(`/api/MateriasPrimas/${id}`, { headers })
  }

  public addMateriasPrimas(materiasPrimas: InventariomateriaprimaInterface): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<InventariomateriaprimaInterface>('/api/MateriasPrimas', materiasPrimas, { headers })
  }

  public modifyMateriasPrimas(materiasPrimas: InventariomateriaprimaInterface){
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<InventariomateriaprimaInterface>(`/api/MateriasPrimas/${materiasPrimas.id}`,
     materiasPrimas, { headers })
  }

  public deleteMateriasPrimas(id: number): Observable<InventariomateriaprimaInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<InventariomateriaprimaInterface>(`/api/MateriasPrimas/${id}`, { headers })
  }
  public comprasRealizadas(): Observable<CompraGET[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CompraGET[]>('/api/Compras/ObtenerComprasRealizadas', { headers })
  }

  public registrarCompra(compra: Compra): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Compra>('/api/Compras/RegistrarCompra', compra, { headers })
  }

  public confirmarCompra(compra: any) {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`/api/Compras/ConfirmarCompra/${compra.id}`, compra, { headers })
  }

  public comprasNoConfirmadas(): Observable<CompraGET[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CompraGET[]>('/api/Compras/ObtenerComprasNoConfirmadas', { headers })
  }

  public obtenertodaslascompras(): Observable<CompraGET[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CompraGET[]>('/api/Compras/ObtenerTodasLasCompras', { headers })
  }

  public getProductos(): Observable<ProductoInterface[]> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoInterface[]>('/api/Catalogo')
  }
  public findProducto(id: number): Observable<ProductoInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoInterface>(`/api/Catalogo/${id}`)
  }

  public addProducto(producto: ProductoInterface): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ProductoInterface>('/api/Productos', producto, { headers })
  }

  public addStockProducto(id: number, nuevoStock: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`/api/Productos/${id}/actualizar-stock`, nuevoStock, { headers })
  }

  public deleteProducto(id: number): Observable<ProductoInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<ProductoInterface>(`/api/Productos/${id}`, { headers })
  }

  public obtenerProductoPorId(id: number): Observable<ProductoInterface> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoInterface>(`/api/Productos/${id}`, { headers })
  }

  public modificarProducto(producto: ProductoInterface): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ProductoInterface>(`/api/Productos/${producto.id}`, producto, { headers })
  }
  public pedidosPorUsuario(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`/api/Pedidos/${id}`, { headers })
  }

  public detallePedido(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`/api/Pedidos/Detalle/${id}`, { headers })
  }
  public agregarCarrito(id: number, fullP: FullPedidoInterface): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`/api/Pedidos`, fullP, { headers })
  }
  public eliminarPedido(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`/api/Pedidos/${id}`, { headers })
  }

   //Compras segun cada cliente
   public getMisCompras(id: number): Observable<VentaInterface[]> {
    return this.http.get<VentaInterface[]>(`/api/VentasC/MisCompras/${id}`)
  }

  //Aprovacion de envio de las ventas Administrador
  public getAprovacion(): Observable<VentaInterface[]> {
    return this.http.get<VentaInterface[]>('/api/VentasA')
  }
  public confirmarEnvio(idVenta: number): Observable<any> {
    return this.http.put<any>(`/api/VentasA/ConfirmarEnvio/${idVenta}`, null);
  }

  public getDetalleVenta(idVenta: number, estatus: string): Observable<DetventaInterface> {
    return this.http.get<DetventaInterface>(`api/VentasA/detalleVenta?idVenta=${idVenta}&estatus=${estatus}`);
  }

  public getFinanzas(): Observable<any> {
    return this.http.get<any>('api/Finanzas');
  }

  public getReporteFinanzas(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get<any>(`api/Finanzas/generarPDF?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
  }

  public pagar(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`/api/Pedidos/Pagar/${id}`, { headers });
  }

  public pagarEfectivo(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`/api/Pedidos/PagarAE/${id}`, null, { headers });
  }

  public getpagarTodo(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`/api/Pedidos/PagarTodo/${id}`, { headers });
  }

  public postpagarTodo(id: number): Observable<any> {
    const token = this.aService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`/api/Pedidos/PagarTodoP/${id}`, null, { headers });
  }


}
