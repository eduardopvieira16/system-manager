import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../data/models/product_model.dart';
import '../../widgets/category_dropdown.dart';
import '../providers/product_provider.dart';

class ProductFormScreen extends StatefulWidget {
  final ProductModel? product;
  const ProductFormScreen({super.key, this.product});

  @override
  State<ProductFormScreen> createState() => _ProductFormScreenState();
}

class _ProductFormScreenState extends State<ProductFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late String _name;
  late String _description;
  late double _price;
  int? _categoryId;

  @override
  void initState() {
    super.initState();
    _name = widget.product?.name ?? '';
    _description = widget.product?.description ?? '';
    _price = widget.product?.price ?? 0.0;
    _categoryId = widget.product?.categoryId;
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<ProductProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.product == null ? 'Novo Produto' : 'Editar Produto'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                initialValue: _name,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (v) =>
                    v == null || v.isEmpty ? 'Campo obrigatório' : null,
                onSaved: (v) => _name = v!,
              ),
              TextFormField(
                initialValue: _description,
                decoration: const InputDecoration(labelText: 'Descrição'),
                onSaved: (v) => _description = v ?? '',
              ),
              TextFormField(
                initialValue: _price == 0.0 ? '' : _price.toString(),
                decoration: const InputDecoration(labelText: 'Preço'),
                keyboardType: TextInputType.number,
                validator: (v) => v == null || double.tryParse(v) == null
                    ? 'Informe um valor válido'
                    : null,
                onSaved: (v) => _price = double.parse(v!),
              ),
              CategoryDropdown(
                initialCategoryId: _categoryId,
                onChanged: (id) => _categoryId = id,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate() &&
                      _categoryId != null) {
                    _formKey.currentState!.save();
                    final product = ProductModel(
                      id: widget.product?.id,
                      name: _name,
                      description: _description,
                      price: _price,
                      categoryId: _categoryId!,
                    );
                    if (widget.product == null) {
                      await provider.addProduct(product);
                    } else {
                      await provider.updateProduct(product);
                    }
                    if (context.mounted) Navigator.pop(context);
                  }
                },
                child: const Text('Salvar'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
