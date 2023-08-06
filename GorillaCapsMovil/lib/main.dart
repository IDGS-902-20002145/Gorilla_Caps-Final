import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:gorila_caps/models/productos.dart';
import 'dart:io';

import 'login.dart';
import 'models/usuarios.dart'; // Importa 'dart:io' para usar HttpClient.


void main() {
  // Deshabilitar la verificación del certificado SSL
  HttpOverrides.global = MyHttpOverrides();

  // Crear una instancia de http.Client
  http.Client client = http.Client();

  runApp(MyApp(client: client));
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback = (X509Certificate cert, String host, int port) => true;
  }
}

class MyApp extends StatelessWidget {
  final http.Client client;

  const MyApp({super.key, required this.client});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.blueGrey[800], // Color de acento para los botones
        textTheme: TextTheme(
          titleLarge: TextStyle(
            color: Colors.blueGrey[800], // Color del texto de los encabezados
            fontWeight: FontWeight.bold, // Negrita
          ),
          bodyMedium: TextStyle(
            color: Colors.blueGrey[800], // Color del texto del cuerpo
          ),
        ), colorScheme: ColorScheme.fromSwatch().copyWith(secondary: Colors.amber),
      ),
      home: LoginScreen(client: client), // Pasar el cliente HTTP a HomePage
    );
  }
}

class HomePage extends StatefulWidget {
  final http.Client client;
  final Usuario usuario;

  const HomePage({Key? key, required this.client, required this.usuario}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final url = Uri.parse("https://192.168.1.4:5000/api/Catalogo");
  late Future<List<Producto>> productos;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              'assets/img/Logo.jpg', // Ruta de la imagen del logo
              height: 50, // Ajusta la altura del logo según tu diseño
              width: 50, // Ajusta el ancho del logo según tu diseño
            ),
            const SizedBox(width: 8), // Espacio entre el logo y el título
            Text(
              'Gorilla Caps',
              style: Theme.of(context).textTheme.titleLarge,
            ),
          ],
        ),
        
      ),
      drawer: NavigationDrawer(usuario: widget.usuario,), // Agrega el Navigation Drawer
      body: FutureBuilder<List<Producto>>(
        future: productos,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text(
                "Ups, ha habido un error: ${snapshot.error}",
                style: const TextStyle(color: Colors.red),
              ),
            );
          } else {
            final List<Producto> listaProductos = snapshot.data!;
            return ListView.builder(
              itemCount: listaProductos.length,
              itemBuilder: (context, index) {
                final Producto producto = listaProductos[index];
                return Card(
                  child: ListTile(
                    leading: Image.memory(base64Decode(producto.imagen)), // Desconvertir de base64 a imagen
                    title: Text(
                      producto.nombre,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    subtitle: Text(
                      producto.descripcion,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    trailing: Text(
                      '\$${producto.precio.toStringAsFixed(2)}',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ProductDetailPage(producto: producto),
                        ),
                      );
                    },
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    productos = getProductos();
  }

  Future<List<Producto>> getProductos() async {
    final res = await widget.client.get(url);

    if (res.statusCode == 200) {
      final List<dynamic> jsonList = jsonDecode(res.body);
      final List<Producto> listaProductos = jsonList.map((json) => Producto.fromJson(json)).toList();

      return listaProductos;
    }
    return Future.error('No se pudo cargar la información de los productos');
  }
}

class ProductDetailPage extends StatelessWidget {
  final Producto producto;

  const ProductDetailPage({super.key, required this.producto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          producto.nombre,
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.memory(base64Decode(producto.imagen)), // Desconvertir de base64 a imagen
            const SizedBox(height: 16),
            Text(
              'Descripción: ${producto.descripcion}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Precio: \$${producto.precio.toStringAsFixed(2)}',
              style: Theme.of(context).textTheme.bodyMedium!.copyWith(fontWeight: FontWeight.bold),
              // Agrega el operador de acceso seguro ?. para que sea condicional
            ),
            const SizedBox(height: 16),
            Text(
              'Existencias: ${producto.stockExistencia}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            Text(
              'Color: ${producto.color}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            Text(
              'Modelo: ${producto.modelo}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Implementar lógica de agregar al carrito
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.secondary,
                textStyle: const TextStyle(color: Colors.white),
              ),
              child: const Text('Agregar al Carrito'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                // Implementar lógica de compra
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.secondary,
                textStyle: const TextStyle(color: Colors.white),
              ),
              child: const Text('Comprar'),
            ),
          ],
        ),
      ),
    );
  }
}

// Agregar el Navigation Drawer
class NavigationDrawer extends StatelessWidget {
  final Usuario usuario;
  NavigationDrawer({required this.usuario,super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          UserAccountsDrawerHeader(
            accountName: Text(
              usuario.nombre,
              style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blueGrey[800]),
            ),
            accountEmail: Text(
              usuario.email,
              style: TextStyle(color: Colors.blueGrey[800]),
            ),
            currentAccountPicture: CircleAvatar(
              backgroundColor: Colors.white,
              child: Icon(
                Icons.person,
                color: Colors.blueGrey[800],
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.home, color: Colors.blueGrey[800]),
            title: Text(
              'Inicio',
              style: TextStyle(color: Colors.blueGrey[800]),
            ),
            onTap: () {
              // Implementar navegación a la pantalla de inicio
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: Icon(Icons.shopping_cart, color: Colors.blueGrey[800]),
            title: Text(
              'Carrito de Compras',
              style: TextStyle(color: Colors.blueGrey[800]),
            ),
            onTap: () {
              // Implementar navegación al carrito de compras
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: Icon(Icons.history, color: Colors.blueGrey[800]),
            title: Text(
              'Historial de Compras',
              style: TextStyle(color: Colors.blueGrey[800]),
            ),
            onTap: () {
              // Implementar navegación al historial de compras
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: Icon(Icons.logout, color: Colors.blueGrey[800]),
            title: Text(
              'Cerrar Sesión',
              style: TextStyle(color: Colors.blueGrey[800]),
            ),
            onTap: () {
              // Implementar lógica de cierre de sesión
              final http.Client client = http.Client();
              //Mostramos una alerta con animación para confirmar el cierre de sesión
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Cerrar Sesión'),
                  content: Text('¿Estás seguro de cerrar sesión?'),
                  actions: [
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: Text('Cancelar'),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen(client: client)));
                      },
                      child: Text('Aceptar'),
                    ),
                  ],
                ),
              );             
            },
          ),
        ],
      ),
    );
  }
}
