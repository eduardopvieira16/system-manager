import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants.dart';
import '../models/product_model.dart';

class ProductRepository {
  Future<List<ProductModel>> fetchProducts({String? filter}) async {
    final url = filter != null && filter.isNotEmpty
        ? '$baseUrl/products?filter=$filter'
        : '$baseUrl/products/v1';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => ProductModel.fromJson(e)).toList();
    }
    throw Exception('Erro ao buscar produtos');
  }

  Future<ProductModel> fetchProduct(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/products/v1/$id'));
    if (response.statusCode == 200) {
      return ProductModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Erro ao buscar produto');
  }

  Future<void> createProduct(ProductModel product) async {
    final response = await http.post(
      Uri.parse('$baseUrl/products/v1'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(product.toJson()),
    );
    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception('Erro ao criar produto');
    }
  }

  Future<void> updateProduct(ProductModel product) async {
    final response = await http.put(
      Uri.parse('$baseUrl/products/v1/${product.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(product.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Erro ao atualizar produto');
    }
  }

  Future<void> deleteProduct(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/products/v1/$id'));
    if (response.statusCode != 204 && response.statusCode != 200) {
      throw Exception('Erro ao remover produto');
    }
  }
}
