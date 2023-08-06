import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import 'login.dart';

class RegisterScreen extends StatefulWidget {
  final http.Client client;

  RegisterScreen({required this.client});

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _nombreController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Registro'),
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
                    controller: _nombreController,
                    decoration: InputDecoration(
                      labelText: 'Nombre de usuario',
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
                SizedBox(height: 12),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 40),
                  child: TextFormField(
                    controller: _confirmPasswordController,
                    decoration: InputDecoration(
                      labelText: 'Confirmar contraseña',
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
                    // ... código del botón de registro ...
                    if (_passwordController.text != _confirmPasswordController.text) {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Las contraseñas no coinciden')));
                      return;
                    } else {
                      try {
                        //Hacemos la peticion post a la api
                        final annio = DateTime.now().year;
                        final mes = DateTime.now().month;
                        final dia = DateTime.now().day;
                        //Creamos un para hacer el formato de la fecha
                        final fecha = DateFormat('yyyy-MM-dd').format(DateTime(annio, mes, dia).toLocal());

                        final response = await widget.client.post(
                          Uri.parse('https://192.168.153.193:5000/api/Login/Registrar'),
                          headers: <String, String>{
                            'Content-Type': 'application/json; charset=UTF-8',
                          },
                          body: jsonEncode(<String, dynamic>{ // Use "dynamic" to handle various data types
                            'id': 0,
                            'name': _nombreController.text,
                            'email': _emailController.text,
                            'password': _passwordController.text,
                            'active': true, // Send as a boolean, not a string
                            'confirmed_at': fecha,
                            'admin': false, // Send as a boolean, not a string
                            'empleado': false, // Assuming "roles" is an array, send it as an empty list
                          }),
                        );

                        if (response.statusCode == 201) {
                          //Si la respuesta es correcta, mostramos una alerta con el mensaje de bienvenida
                          _showAlert(context, "¡Bienvenido a GorillaCaps!", "Ahora puedes iniciar sesión");
                          //Hacemos una espera de 2 segundos para que se muestre el mensaje de bienvenida
                          await Future.delayed(Duration(seconds: 2));
                          Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen(client: widget.client)));
                        } else {
                          //Si la respuesta es incorrecta, mostramos un mensaje de error mediante una alerta
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                title: Text('Error'),
                                content: Text('Error al registrarse, el correo ya está en uso'),
                                actions: [
                                  TextButton(
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                    child: Text('Cerrar'),
                                  ),
                                ],
                              );
                            },
                          );
                        }
                      } catch (e) {
                        print(e);
                      }
                    }
                  },
                  child: Text('Registrarse'),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    elevation: 5, // Agregar sombra al botón
                    primary: Colors.teal, // Color de fondo del botón
                  ),
                ),
                // Metemos otro botón para ir a la pantalla de inicio de sesión
                TextButton(
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen(client: widget.client)));
                  },
                  child: Text('Iniciar Sesión', style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // Hacemos una función para mostrar una alerta
  void _showAlert(BuildContext context, String title, String content) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: Text(content),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cerrar'),
            ),
          ],
        );
      },
    );
  }
}
