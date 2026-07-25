import '../../domain/entities/department.dart';

class DepartmentModel extends Department {
  DepartmentModel({
    super.id,
    required super.name,
    super.description,
    super.active = true,
  });

  factory DepartmentModel.fromJson(Map<String, dynamic> json) =>
      DepartmentModel(
        id: json['id'],
        name: json['name'],
        description: json['description'],
        active: json['active'] ?? true,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'description': description,
        'active': active,
      };
}
