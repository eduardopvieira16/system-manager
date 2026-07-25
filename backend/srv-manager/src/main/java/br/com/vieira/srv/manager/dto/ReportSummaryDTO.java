package br.com.vieira.srv.manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportSummaryDTO {
	private long totalProducts;
	private long totalCategories;
	private long totalDepartments;
	private long totalUsers;
}
