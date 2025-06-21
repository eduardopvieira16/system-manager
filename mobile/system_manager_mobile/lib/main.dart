import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'data/repositories/category_repository.dart';
import 'data/repositories/product_repository.dart';
import 'presentation/providers/category_provider.dart';
import 'presentation/providers/product_provider.dart';
import 'presentation/screens/category_list_screen.dart';
import 'presentation/screens/product_list_screen.dart';

void main() {
  runApp(const SystemManagerApp());
}

class SystemManagerApp extends StatelessWidget {
  const SystemManagerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => ProductProvider(ProductRepository()),
        ),
        ChangeNotifierProvider(
          create: (_) =>
              CategoryProvider(CategoryRepository())..loadCategories(),
        ),
      ],
      child: MaterialApp(
        title: 'System Manager',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: const HomeScreen(),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('System Manager')),
      body: ListView(
        children: [
          ListTile(
            title: const Text('Produtos'),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const ProductListScreen()),
            ),
          ),
          ListTile(
            title: const Text('Categorias'),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const CategoryListScreen()),
            ),
          ),
        ],
      ),
    );
  }
}
