import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../presentation/providers/category_provider.dart';

class CategoryDropdown extends StatelessWidget {
  final int? initialCategoryId;
  final ValueChanged<int> onChanged;

  const CategoryDropdown({
    super.key,
    required this.initialCategoryId,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CategoryProvider>(context);
    final categories = provider.categories;

    return DropdownButtonFormField<int>(
      value: initialCategoryId,
      decoration: const InputDecoration(labelText: 'Categoria'),
      items: categories
          .map((cat) => DropdownMenuItem(value: cat.id, child: Text(cat.name)))
          .toList(),
      onChanged: (value) {
        if (value != null) onChanged(value);
      },
      validator: (v) => v == null ? 'Selecione uma categoria' : null,
    );
  }
}
