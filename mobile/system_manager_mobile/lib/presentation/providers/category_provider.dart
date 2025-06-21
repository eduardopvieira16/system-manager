import 'package:flutter/material.dart';

import '../../data/models/category_model.dart';
import '../../data/repositories/category_repository.dart';

class CategoryProvider extends ChangeNotifier {
  final CategoryRepository repository;
  List<CategoryModel> _categories = [];
  bool _loading = false;
  String? _error;

  CategoryProvider(this.repository);

  List<CategoryModel> get categories => _categories;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadCategories() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      _categories = await repository.fetchCategories();
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }

  Future<void> addCategory(CategoryModel category) async {
    try {
      await repository.createCategory(category);
      await loadCategories();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> updateCategory(CategoryModel category) async {
    try {
      await repository.updateCategory(category);
      await loadCategories();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> deleteCategory(int id) async {
    try {
      await repository.deleteCategory(id);
      await loadCategories();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}
