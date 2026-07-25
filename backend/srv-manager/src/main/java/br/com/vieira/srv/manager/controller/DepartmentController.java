package br.com.vieira.srv.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vieira.srv.manager.dto.DepartmentDTO;
import br.com.vieira.srv.manager.service.DepartmentService;

@RestController
@RequestMapping("/api/departments/v1")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	@GetMapping
	public List<DepartmentDTO> listDepartments() {
		return departmentService.findAll();
	}

	@GetMapping("/{id}")
	public DepartmentDTO getDepartment(@PathVariable Long id) {
		return departmentService.findById(id);
	}

	@PostMapping
	public DepartmentDTO createDepartment(@RequestBody DepartmentDTO departmentDTO) {
		return departmentService.createDepartment(departmentDTO);
	}

	@PutMapping("/{id}")
	public DepartmentDTO updateDepartment(@PathVariable Long id, @RequestBody DepartmentDTO departmentDTO) {
		return departmentService.updateDepartment(id, departmentDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteDepartment(@PathVariable Long id) {
		departmentService.deleteDepartment(id);
	}
}
