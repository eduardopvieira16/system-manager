class UserAccount {
  final int? id;
  final String name;
  final String email;
  final String? phone;
  final String role;
  final String status;
  final int? departmentId;
  final String? departmentName;

  UserAccount({
    this.id,
    required this.name,
    required this.email,
    this.phone,
    required this.role,
    required this.status,
    this.departmentId,
    this.departmentName,
  });
}
