class Usuario {
  int id;
  String nombre;
  String email;
  String password;
  bool active;
  DateTime confirmedAt;
  bool admin;
  bool empleado;
  dynamic roles;
  String token;

  Usuario({
    required this.id,
    required this.nombre,
    required this.email,
    required this.password,
    required this.active,
    required this.confirmedAt,
    required this.admin,
    required this.empleado,
    required this.roles,
    required this.token,
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: json['user']['id'],
      nombre: json['user']['name'],
      email: json['user']['email'],
      password: json['user']['password'],
      active: json['user']['active'],
      confirmedAt: DateTime.parse(json['user']['confirmed_At']),
      admin: json['user']['admin'],
      empleado: json['user']['empleado'],
      roles: json['user']['roles'],
      token: json['token'],
    );
  }
}
