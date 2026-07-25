package br.com.vieira.srv.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vieira.srv.manager.dto.ReportSummaryDTO;
import br.com.vieira.srv.manager.repository.CategoryRepository;
import br.com.vieira.srv.manager.repository.DepartmentRepository;
import br.com.vieira.srv.manager.repository.ProductRepository;
import br.com.vieira.srv.manager.repository.UserAccountRepository;

@RestController
@RequestMapping("/api/reports/v1")
public class ReportController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private UserAccountRepository userAccountRepository;

	@GetMapping("/summary")
	public ReportSummaryDTO getSummary() {
		return new ReportSummaryDTO(
				productRepository.count(),
				categoryRepository.count(),
				departmentRepository.count(),
				userAccountRepository.count());
	}
}
