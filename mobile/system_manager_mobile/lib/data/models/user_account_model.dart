import '../../domain/entities/user_account.dart';

class UserAccountModel extends UserAccount {
  UserAccountModel({
    super.id,
    required super.name,
    required super.email,
    super.phone,
    required super.role,
    required super.status,
    super.departmentId,
    super.departmentName,
  });

  factory UserAccountModel.fromJson(Map<String, dynamic> json) =>
      UserAccountModel(
        id: json['id'],
        name: json['name'],
        email: json['email'],
        phone: json['phone'],
        role: json['role'],
        status: json['status'],
        departmentId: json['departmentId'],
        departmentName: json['departmentName'],
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'phone': phone,
        'role': role,
        'status': status,
        'departmentId': departmentId,
      };
}
