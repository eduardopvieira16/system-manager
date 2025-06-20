package br.com.vieira.srv.manager.service;

import java.util.List;

import br.com.vieira.srv.manager.dto.CategoryDTO;

public interface CategoryService {
	List<CategoryDTO> findAll();

	CategoryDTO findById(Long id);

	CategoryDTO createCategory(CategoryDTO categoryDTO);

	CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);

	void deleteCategory(Long id);
}
