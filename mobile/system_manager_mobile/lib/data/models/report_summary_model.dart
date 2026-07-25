import '../../domain/entities/report_summary.dart';

class ReportSummaryModel extends ReportSummary {
  ReportSummaryModel({
    required super.totalProducts,
    required super.totalCategories,
    required super.totalDepartments,
    required super.totalUsers,
  });

  factory ReportSummaryModel.fromJson(Map<String, dynamic> json) =>
      ReportSummaryModel(
        totalProducts: json['totalProducts'] ?? 0,
        totalCategories: json['totalCategories'] ?? 0,
        totalDepartments: json['totalDepartments'] ?? 0,
        totalUsers: json['totalUsers'] ?? 0,
      );
}
