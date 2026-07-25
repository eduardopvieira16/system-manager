import 'package:flutter/material.dart';

import '../../data/models/user_account_model.dart';
import '../../data/repositories/user_account_repository.dart';

class UserProvider extends ChangeNotifier {
  final UserAccountRepository repository;
  List<UserAccountModel> _users = [];
  bool _loading = false;
  String? _error;

  UserProvider(this.repository);

  List<UserAccountModel> get users => _users;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadUsers() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      _users = await repository.fetchUsers();
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }

  Future<void> addUser(UserAccountModel user) async {
    try {
      await repository.createUser(user);
      await loadUsers();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> updateUser(UserAccountModel user) async {
    try {
      await repository.updateUser(user);
      await loadUsers();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> deleteUser(int id) async {
    try {
      await repository.deleteUser(id);
      await loadUsers();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}
