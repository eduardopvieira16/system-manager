import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/report_provider.dart';

class ReportSummaryScreen extends StatefulWidget {
  const ReportSummaryScreen({super.key});

  @override
  State<ReportSummaryScreen> createState() => _ReportSummaryScreenState();
}

class _ReportSummaryScreenState extends State<ReportSummaryScreen> {
  @override
  void initState() {
    super.initState();
    Provider.of<ReportProvider>(context, listen: false).loadSummary();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<ReportProvider>(context);

    if (provider.loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (provider.error != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Relatórios')),
        body: Center(child: Text(provider.error!)),
      );
    }

    final summary = provider.summary;
    return Scaffold(
      appBar: AppBar(title: const Text('Relatórios')),
      body: summary == null
          ? const Center(child: Text('Nenhum dado disponível'))
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _SummaryCard(title: 'Produtos', value: summary.totalProducts),
                _SummaryCard(
                  title: 'Categorias',
                  value: summary.totalCategories,
                ),
                _SummaryCard(
                  title: 'Departamentos',
                  value: summary.totalDepartments,
                ),
                _SummaryCard(title: 'Usuários', value: summary.totalUsers),
              ],
            ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final String title;
  final int value;

  const _SummaryCard({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        title: Text(title),
        trailing: Text(
          value.toString(),
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
