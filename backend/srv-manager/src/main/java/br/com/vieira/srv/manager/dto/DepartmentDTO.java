package br.com.vieira.srv.manager.dto;

import lombok.Data;

@Data
public class DepartmentDTO {
	private Long id;
	private String name;
	private String description;
	private boolean active;
}
