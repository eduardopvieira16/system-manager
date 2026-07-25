import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants.dart';
import '../models/user_account_model.dart';

class UserAccountRepository {
  Future<List<UserAccountModel>> fetchUsers() async {
    final response = await http.get(Uri.parse('$baseUrl/users/v1'));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => UserAccountModel.fromJson(e)).toList();
    }
    throw Exception('Erro ao buscar usuários');
  }

  Future<UserAccountModel> fetchUser(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/users/v1/$id'));
    if (response.statusCode == 200) {
      return UserAccountModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Erro ao buscar usuário');
  }

  Future<void> createUser(UserAccountModel user) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users/v1'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(user.toJson()),
    );
    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception('Erro ao criar usuário');
    }
  }

  Future<void> updateUser(UserAccountModel user) async {
    final response = await http.put(
      Uri.parse('$baseUrl/users/v1/${user.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(user.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Erro ao atualizar usuário');
    }
  }

  Future<void> deleteUser(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/users/v1/$id'));
    if (response.statusCode != 204 && response.statusCode != 200) {
      throw Exception('Erro ao remover usuário');
    }
  }
}
