package br.com.vieira.srv.manager.service;

import java.util.List;

import br.com.vieira.srv.manager.dto.DepartmentDTO;

public interface DepartmentService {
	List<DepartmentDTO> findAll();

	DepartmentDTO findById(Long id);

	DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

	DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO);

	void deleteDepartment(Long id);
}
