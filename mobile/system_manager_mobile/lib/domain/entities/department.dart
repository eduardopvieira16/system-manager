class Department {
  final int? id;
  final String name;
  final String? description;
  final bool active;

  Department({this.id, required this.name, this.description, this.active = true});
}
