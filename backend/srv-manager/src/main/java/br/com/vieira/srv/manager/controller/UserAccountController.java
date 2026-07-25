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

import br.com.vieira.srv.manager.dto.UserAccountDTO;
import br.com.vieira.srv.manager.service.UserAccountService;

@RestController
@RequestMapping("/api/users/v1")
public class UserAccountController {

	@Autowired
	private UserAccountService userAccountService;

	@GetMapping
	public List<UserAccountDTO> listUsers() {
		return userAccountService.findAll();
	}

	@GetMapping("/{id}")
	public UserAccountDTO getUser(@PathVariable Long id) {
		return userAccountService.findById(id);
	}

	@PostMapping
	public UserAccountDTO createUser(@RequestBody UserAccountDTO userAccountDTO) {
		return userAccountService.createUser(userAccountDTO);
	}

	@PutMapping("/{id}")
	public UserAccountDTO updateUser(@PathVariable Long id, @RequestBody UserAccountDTO userAccountDTO) {
		return userAccountService.updateUser(id, userAccountDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		userAccountService.deleteUser(id);
	}
}
