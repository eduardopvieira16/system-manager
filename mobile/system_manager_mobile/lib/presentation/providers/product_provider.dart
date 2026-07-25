import 'package:flutter/material.dart';

import '../../data/models/product_model.dart';
import '../../data/repositories/product_repository.dart';

class ProductProvider extends ChangeNotifier {
  final ProductRepository repository;
  List<ProductModel> _products = [];
  bool _loading = false;
  String? _error;

  ProductProvider(this.repository);

  List<ProductModel> get products => _products;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadProducts({String? filter}) async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      _products = await repository.fetchProducts(filter: filter);
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }

  Future<void> addProduct(ProductModel product) async {
    try {
      await repository.createProduct(product);
      await loadProducts();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> updateProduct(ProductModel product) async {
    try {
      await repository.updateProduct(product);
      await loadProducts();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> deleteProduct(int id) async {
    try {
      await repository.deleteProduct(id);
      await loadProducts();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}
