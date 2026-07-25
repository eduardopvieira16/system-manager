package br.com.vieira.srv.manager.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vieira.srv.manager.dto.DepartmentDTO;
import br.com.vieira.srv.manager.exception.ResourceNotFoundException;
import br.com.vieira.srv.manager.model.Department;
import br.com.vieira.srv.manager.repository.DepartmentRepository;
import br.com.vieira.srv.manager.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Override
	public List<DepartmentDTO> findAll() {
		return departmentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public DepartmentDTO findById(Long id) {
		Department department = departmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado"));
		return toDTO(department);
	}

	@Override
	public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
		Department department = new Department();
		applyChanges(department, departmentDTO);
		Department saved = departmentRepository.save(department);
		return toDTO(saved);
	}

	@Override
	public DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO) {
		Department department = departmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado"));
		applyChanges(department, departmentDTO);
		Department saved = departmentRepository.save(department);
		return toDTO(saved);
	}

	@Override
	public void deleteDepartment(Long id) {
		if (!departmentRepository.existsById(id)) {
			throw new ResourceNotFoundException("Departamento não encontrado");
		}
		departmentRepository.deleteById(id);
	}

	private DepartmentDTO toDTO(Department department) {
		DepartmentDTO dto = new DepartmentDTO();
		dto.setId(department.getId());
		dto.setName(department.getName());
		dto.setDescription(department.getDescription());
		dto.setActive(department.isActive());
		return dto;
	}

	private void applyChanges(Department department, DepartmentDTO dto) {
		department.setName(dto.getName());
		department.setDescription(dto.getDescription());
		department.setActive(dto.isActive());
	}
}
