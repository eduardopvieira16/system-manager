import 'package:flutter/material.dart';

import '../../data/models/department_model.dart';
import '../../data/repositories/department_repository.dart';

class DepartmentProvider extends ChangeNotifier {
  final DepartmentRepository repository;
  List<DepartmentModel> _departments = [];
  bool _loading = false;
  String? _error;

  DepartmentProvider(this.repository);

  List<DepartmentModel> get departments => _departments;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadDepartments() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      _departments = await repository.fetchDepartments();
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }

  Future<void> addDepartment(DepartmentModel department) async {
    try {
      await repository.createDepartment(department);
      await loadDepartments();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> updateDepartment(DepartmentModel department) async {
    try {
      await repository.updateDepartment(department);
      await loadDepartments();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> deleteDepartment(int id) async {
    try {
      await repository.deleteDepartment(id);
      await loadDepartments();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}
