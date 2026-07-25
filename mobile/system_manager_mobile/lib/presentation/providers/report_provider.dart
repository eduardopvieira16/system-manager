import 'package:flutter/material.dart';

import '../../data/models/report_summary_model.dart';
import '../../data/repositories/report_repository.dart';

class ReportProvider extends ChangeNotifier {
  final ReportRepository repository;
  ReportSummaryModel? _summary;
  bool _loading = false;
  String? _error;

  ReportProvider(this.repository);

  ReportSummaryModel? get summary => _summary;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadSummary() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      _summary = await repository.fetchSummary();
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }
}
