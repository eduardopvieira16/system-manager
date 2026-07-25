import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants.dart';
import '../models/category_model.dart';

class CategoryRepository {
  Future<List<CategoryModel>> fetchCategories() async {
    final response = await http.get(Uri.parse('$baseUrl/categories/v1'));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => CategoryModel.fromJson(e)).toList();
    }
    throw Exception('Erro ao buscar categorias');
  }

  Future<CategoryModel> fetchCategory(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/categories/v1/$id'));
    if (response.statusCode == 200) {
      return CategoryModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Erro ao buscar categoria');
  }

  Future<void> createCategory(CategoryModel category) async {
    final response = await http.post(
      Uri.parse('$baseUrl/categories/v1'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(category.toJson()),
    );
    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception('Erro ao criar categoria');
    }
  }

  Future<void> updateCategory(CategoryModel category) async {
    final response = await http.put(
      Uri.parse('$baseUrl/categories/v1/${category.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(category.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Erro ao atualizar categoria');
    }
  }

  Future<void> deleteCategory(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/categories/v1/$id'));
    if (response.statusCode != 204 && response.statusCode != 200) {
      throw Exception('Erro ao remover categoria');
    }
  }
}
