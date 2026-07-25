import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../data/models/user_account_model.dart';
import '../providers/department_provider.dart';
import '../providers/user_provider.dart';

class UserFormScreen extends StatefulWidget {
  final UserAccountModel? user;
  const UserFormScreen({super.key, this.user});

  @override
  State<UserFormScreen> createState() => _UserFormScreenState();
}

class _UserFormScreenState extends State<UserFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  String _role = 'OPERATOR';
  String _status = 'ACTIVE';
  int? _departmentId;

  @override
  void initState() {
    super.initState();
    _nameController =
        TextEditingController(text: widget.user?.name ?? '');
    _emailController =
        TextEditingController(text: widget.user?.email ?? '');
    _phoneController =
        TextEditingController(text: widget.user?.phone ?? '');
    _role = widget.user?.role ?? 'OPERATOR';
    _status = widget.user?.status ?? 'ACTIVE';
    _departmentId = widget.user?.departmentId;
    Provider.of<DepartmentProvider>(context, listen: false).loadDepartments();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<UserProvider>(context, listen: false);
    final departmentProvider = Provider.of<DepartmentProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user == null ? 'Novo Usuário' : 'Editar Usuário'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Informe o nome' : null,
              ),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'E-mail'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Informe o e-mail' : null,
              ),
              TextFormField(
                controller: _phoneController,
                decoration: const InputDecoration(labelText: 'Telefone'),
              ),
              DropdownButtonFormField<String>(
                value: _role,
                decoration: const InputDecoration(labelText: 'Perfil'),
                items: const [
                  DropdownMenuItem(value: 'ADMIN', child: Text('Administrador')),
                  DropdownMenuItem(value: 'MANAGER', child: Text('Gestor')),
                  DropdownMenuItem(value: 'OPERATOR', child: Text('Operador')),
                ],
                onChanged: (value) => setState(() => _role = value ?? 'OPERATOR'),
              ),
              DropdownButtonFormField<String>(
                value: _status,
                decoration: const InputDecoration(labelText: 'Status'),
                items: const [
                  DropdownMenuItem(value: 'ACTIVE', child: Text('Ativo')),
                  DropdownMenuItem(value: 'INACTIVE', child: Text('Inativo')),
                  DropdownMenuItem(value: 'ON_LEAVE', child: Text('Em licença')),
                ],
                onChanged: (value) => setState(() => _status = value ?? 'ACTIVE'),
              ),
              DropdownButtonFormField<int?>(
                value: _departmentId,
                decoration: const InputDecoration(labelText: 'Departamento'),
                items: [
                  const DropdownMenuItem<int?>(
                    value: null,
                    child: Text('Sem departamento'),
                  ),
                  ...departmentProvider.departments.map(
                    (department) => DropdownMenuItem<int?>(
                      value: department.id,
                      child: Text(department.name),
                    ),
                  ),
                ],
                onChanged: (value) => setState(() => _departmentId = value),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    final user = UserAccountModel(
                      id: widget.user?.id,
                      name: _nameController.text,
                      email: _emailController.text,
                      phone: _phoneController.text,
                      role: _role,
                      status: _status,
                      departmentId: _departmentId,
                    );

                    if (widget.user == null) {
                      await provider.addUser(user);
                    } else {
                      await provider.updateUser(user);
                    }

                    if (mounted) {
                      Navigator.pop(context);
                    }
                  }
                },
                child: Text(widget.user == null ? 'Criar' : 'Atualizar'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
