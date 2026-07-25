import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../data/models/department_model.dart';
import '../providers/department_provider.dart';

class DepartmentFormScreen extends StatefulWidget {
  final DepartmentModel? department;
  const DepartmentFormScreen({super.key, this.department});

  @override
  State<DepartmentFormScreen> createState() => _DepartmentFormScreenState();
}

class _DepartmentFormScreenState extends State<DepartmentFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _descriptionController;
  bool _active = true;

  @override
  void initState() {
    super.initState();
    _nameController =
        TextEditingController(text: widget.department?.name ?? '');
    _descriptionController =
        TextEditingController(text: widget.department?.description ?? '');
    _active = widget.department?.active ?? true;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DepartmentProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.department == null
            ? 'Novo Departamento'
            : 'Editar Departamento'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Informe o nome' : null,
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: const InputDecoration(labelText: 'Descrição'),
              ),
              SwitchListTile(
                title: const Text('Departamento ativo'),
                value: _active,
                onChanged: (value) => setState(() => _active = value),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    final department = DepartmentModel(
                      id: widget.department?.id,
                      name: _nameController.text,
                      description: _descriptionController.text,
                      active: _active,
                    );

                    if (widget.department == null) {
                      await provider.addDepartment(department);
                    } else {
                      await provider.updateDepartment(department);
                    }

                    if (mounted) {
                      Navigator.pop(context);
                    }
                  }
                },
                child:
                    Text(widget.department == null ? 'Criar' : 'Atualizar'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
