package br.com.vieira.srv.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vieira.srv.manager.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
