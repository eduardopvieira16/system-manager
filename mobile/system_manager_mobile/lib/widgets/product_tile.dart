import 'package:flutter/material.dart';

import '../data/models/product_model.dart';
import '../presentation/screens/product_form_screen.dart';

class ProductTile extends StatelessWidget {
  final ProductModel product;
  const ProductTile({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(product.name),
      subtitle: Text('R\$ ${product.price.toStringAsFixed(2)}'),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ProductFormScreen(product: product),
          ),
        );
      },
    );
  }
}
