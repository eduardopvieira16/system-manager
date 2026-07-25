import '../../data/models/category_model.dart';
import '../../data/repositories/category_repository.dart';

class CreateCategory {
  final CategoryRepository repository;
  CreateCategory(this.repository);

  Future<void> call(CategoryModel category) =>
      repository.createCategory(category);
}
