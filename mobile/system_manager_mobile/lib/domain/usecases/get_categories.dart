import '../../data/models/category_model.dart';
import '../../data/repositories/category_repository.dart';

class GetCategories {
  final CategoryRepository repository;
  GetCategories(this.repository);

  Future<List<CategoryModel>> call() => repository.fetchCategories();
}
