package br.com.vieira.srv.manager.service;

import java.util.List;

import br.com.vieira.srv.manager.dto.UserAccountDTO;

public interface UserAccountService {
	List<UserAccountDTO> findAll();

	UserAccountDTO findById(Long id);

	UserAccountDTO createUser(UserAccountDTO userAccountDTO);

	UserAccountDTO updateUser(Long id, UserAccountDTO userAccountDTO);

	void deleteUser(Long id);
}
