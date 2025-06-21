import '../../data/models/product_model.dart';
import '../../data/repositories/product_repository.dart';

class GetProducts {
  final ProductRepository repository;
  GetProducts(this.repository);

  Future<List<ProductModel>> call({String? filter}) =>
      repository.fetchProducts(filter: filter);
}
