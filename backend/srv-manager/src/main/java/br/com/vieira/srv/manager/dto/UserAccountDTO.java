package br.com.vieira.srv.manager.dto;

import br.com.vieira.srv.manager.enums.UserRole;
import br.com.vieira.srv.manager.enums.UserStatus;
import lombok.Data;

@Data
public class UserAccountDTO {
	private Long id;
	private String name;
	private String email;
	private String phone;
	private UserRole role;
	private UserStatus status;
	private Long departmentId;
	private String departmentName;
}
