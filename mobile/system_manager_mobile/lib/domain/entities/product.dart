class Product {
  final int? id;
  final String name;
  final String description;
  final double price;
  final int categoryId;

  Product({
    this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.categoryId,
  });
}
