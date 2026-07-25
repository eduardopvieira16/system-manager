package br.com.vieira.srv.manager.repository;

import br.com.vieira.srv.manager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
