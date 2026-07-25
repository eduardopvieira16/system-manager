import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants.dart';
import '../models/department_model.dart';

class DepartmentRepository {
  Future<List<DepartmentModel>> fetchDepartments() async {
    final response = await http.get(Uri.parse('$baseUrl/departments/v1'));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => DepartmentModel.fromJson(e)).toList();
    }
    throw Exception('Erro ao buscar departamentos');
  }

  Future<DepartmentModel> fetchDepartment(int id) async {
    final response =
        await http.get(Uri.parse('$baseUrl/departments/v1/$id'));
    if (response.statusCode == 200) {
      return DepartmentModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Erro ao buscar departamento');
  }

  Future<void> createDepartment(DepartmentModel department) async {
    final response = await http.post(
      Uri.parse('$baseUrl/departments/v1'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(department.toJson()),
    );
    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception('Erro ao criar departamento');
    }
  }

  Future<void> updateDepartment(DepartmentModel department) async {
    final response = await http.put(
      Uri.parse('$baseUrl/departments/v1/${department.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(department.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Erro ao atualizar departamento');
    }
  }

  Future<void> deleteDepartment(int id) async {
    final response =
        await http.delete(Uri.parse('$baseUrl/departments/v1/$id'));
    if (response.statusCode != 204 && response.statusCode != 200) {
      throw Exception('Erro ao remover departamento');
    }
  }
}
