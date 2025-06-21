import '../../data/models/product_model.dart';
import '../../data/repositories/product_repository.dart';

class CreateProduct {
  final ProductRepository repository;
  CreateProduct(this.repository);

  Future<void> call(ProductModel product) => repository.createProduct(product);
}
