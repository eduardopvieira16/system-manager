package br.com.vieira.srv.manager.service.impl;

import br.com.vieira.srv.manager.dto.CategoryDTO;
import br.com.vieira.srv.manager.exception.ResourceNotFoundException;
import br.com.vieira.srv.manager.model.Category;
import br.com.vieira.srv.manager.repository.CategoryRepository;
import br.com.vieira.srv.manager.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<CategoryDTO> findAll() {
		return categoryRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public CategoryDTO findById(Long id) {
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
		return toDTO(category);
	}

	@Override
	public CategoryDTO createCategory(CategoryDTO categoryDTO) {
		Category category = new Category();
		
		category.setName(categoryDTO.getName());
		category = categoryRepository.save(category);
		return toDTO(category);
	}

	@Override
	public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
		category.setName(categoryDTO.getName());
		category = categoryRepository.save(category);
		return toDTO(category);
	}

	@Override
	public void deleteCategory(Long id) {
		if (!categoryRepository.existsById(id)) {
			throw new ResourceNotFoundException("Categoria não encontrada");
		}
		categoryRepository.deleteById(id);
	}

	private CategoryDTO toDTO(Category category) {
		CategoryDTO dto = new CategoryDTO();
		dto.setId(category.getId());
		dto.setName(category.getName());
		return dto;
	}
}