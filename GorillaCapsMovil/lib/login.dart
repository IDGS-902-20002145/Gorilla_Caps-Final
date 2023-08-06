import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:gorila_caps/main.dart';
import 'package:gorila_caps/register.dart';
import 'package:http/http.dart' as http;

import 'models/usuarios.dart';

class LoginScreen extends StatefulWidget {
  final http.Client client;

  LoginScreen({required this.client});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Iniciar Sesión'),
        automaticallyImplyLeading: false, // Eliminar botón de regresar
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.blue, Colors.teal], // Colores del fondo degradado
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.3),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3), // Cambiar la posición de la sombra
                      ),
                    ],
                  ),
                  child: ClipOval(
                    child: Image.asset(
                      'assets/img/Logo.jpg',
                      height: 120,
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 40),
                  child: TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Correo electrónico',
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 12),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 40),
                  child: TextFormField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: 'Contraseña',
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    obscureText: true,
                  ),
                ),
                SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () async {
                    try {
                      // Hacemos la petición post a la api
                      final response = await widget.client.post(
                        Uri.parse('https://192.168.153.193:5000/api/Login/authenticate'),
                        headers: <String, String>{
                          'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: jsonEncode(<String, String>{
                          'email': _emailController.text,
                          'password': _passwordController.text,
                        }),
                      );
                      final usuario = Usuario.fromJson(jsonDecode(response.body.toString()));
                      if (response.statusCode == 200) {
                        // Si la respuesta es correcta, guardamos el token y vamos a la pantalla principal
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => HomePage(client: widget.client, usuario: usuario)),
                        );
                      } else {
                        // Si la respuesta es incorrecta, mostramos un mensaje de error
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error al iniciar sesión')));
                      }
                    } catch (e) {
                      print(e);
                    }
                  },
                  child: Text('Iniciar Sesión'),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 5, // Agregar sombra al botón
                    primary: Colors.teal, // Color de fondo del botón
                  ),
                ),
                // Boton para ir a la pantalla de registro
                TextButton(
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => RegisterScreen(client: widget.client)));
                  },
                  child: Text('Registrarse', style: TextStyle(color: Colors.white)),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 5, // Agregar sombra al botón
                    primary: Colors.deepPurple, // Color de fondo del botón
                  ),
                  )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
