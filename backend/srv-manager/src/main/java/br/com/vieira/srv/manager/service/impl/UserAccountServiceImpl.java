package br.com.vieira.srv.manager.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vieira.srv.manager.dto.UserAccountDTO;
import br.com.vieira.srv.manager.exception.ResourceNotFoundException;
import br.com.vieira.srv.manager.model.Department;
import br.com.vieira.srv.manager.model.UserAccount;
import br.com.vieira.srv.manager.repository.DepartmentRepository;
import br.com.vieira.srv.manager.repository.UserAccountRepository;
import br.com.vieira.srv.manager.service.UserAccountService;

@Service
public class UserAccountServiceImpl implements UserAccountService {

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Override
	public List<UserAccountDTO> findAll() {
		return userAccountRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public UserAccountDTO findById(Long id) {
		UserAccount user = userAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
		return toDTO(user);
	}

	@Override
	public UserAccountDTO createUser(UserAccountDTO userAccountDTO) {
		UserAccount user = new UserAccount();
		applyChanges(user, userAccountDTO);
		UserAccount saved = userAccountRepository.save(user);
		return toDTO(saved);
	}

	@Override
	public UserAccountDTO updateUser(Long id, UserAccountDTO userAccountDTO) {
		UserAccount user = userAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
		applyChanges(user, userAccountDTO);
		UserAccount saved = userAccountRepository.save(user);
		return toDTO(saved);
	}

	@Override
	public void deleteUser(Long id) {
		if (!userAccountRepository.existsById(id)) {
			throw new ResourceNotFoundException("Usuário não encontrado");
		}
		userAccountRepository.deleteById(id);
	}

	private UserAccountDTO toDTO(UserAccount user) {
		UserAccountDTO dto = new UserAccountDTO();
		dto.setId(user.getId());
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		dto.setRole(user.getRole());
		dto.setStatus(user.getStatus());
		if (user.getDepartment() != null) {
			dto.setDepartmentId(user.getDepartment().getId());
			dto.setDepartmentName(user.getDepartment().getName());
		}
		return dto;
	}

	private void applyChanges(UserAccount user, UserAccountDTO dto) {
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPhone(dto.getPhone());
		user.setRole(dto.getRole());
		user.setStatus(dto.getStatus());
		if (dto.getDepartmentId() != null) {
			Department department = departmentRepository.findById(dto.getDepartmentId())
					.orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado"));
			user.setDepartment(department);
		} else {
			user.setDepartment(null);
		}
	}
}
