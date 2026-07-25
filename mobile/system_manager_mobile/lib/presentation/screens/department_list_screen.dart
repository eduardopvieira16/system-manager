import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/department_provider.dart';
import 'department_form_screen.dart';

class DepartmentListScreen extends StatefulWidget {
  const DepartmentListScreen({super.key});

  @override
  State<DepartmentListScreen> createState() => _DepartmentListScreenState();
}

class _DepartmentListScreenState extends State<DepartmentListScreen> {
  @override
  void initState() {
    super.initState();
    Provider.of<DepartmentProvider>(context, listen: false).loadDepartments();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DepartmentProvider>(context);

    if (provider.loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (provider.error != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Departamentos')),
        body: Center(child: Text(provider.error!)),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Departamentos')),
      body: ListView.builder(
        itemCount: provider.departments.length,
        itemBuilder: (context, index) {
          final department = provider.departments[index];
          return ListTile(
            title: Text(department.name),
            subtitle: Text(
              department.active ? 'Ativo' : 'Inativo',
              style: TextStyle(
                color: department.active ? Colors.green : Colors.red,
              ),
            ),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            DepartmentFormScreen(department: department),
                      ),
                    );
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () async {
                    await provider.deleteDepartment(department.id!);
                  },
                ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const DepartmentFormScreen()),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
