import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants.dart';
import '../models/report_summary_model.dart';

class ReportRepository {
  Future<ReportSummaryModel> fetchSummary() async {
    final response = await http.get(Uri.parse('$baseUrl/reports/v1/summary'));
    if (response.statusCode == 200) {
      return ReportSummaryModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Erro ao buscar resumo');
  }
}
