package br.com.vieira.srv.manager.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vieira.srv.manager.dto.ProductDTO;
import br.com.vieira.srv.manager.exception.ResourceNotFoundException;
import br.com.vieira.srv.manager.model.Category;
import br.com.vieira.srv.manager.model.Product;
import br.com.vieira.srv.manager.repository.CategoryRepository;
import br.com.vieira.srv.manager.repository.ProductRepository;
import br.com.vieira.srv.manager.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<ProductDTO> findAll() {
		return productRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public ProductDTO findById(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
		return toDTO(product);
	}

	@Override
	public ProductDTO createProduct(ProductDTO productDTO) {
		Product product = new Product();
		product.setName(productDTO.getName());
		product.setDescription(productDTO.getDescription());
		product.setPrice(productDTO.getPrice());
		if (productDTO.getCategoryId() != null) {
			Category category = categoryRepository.findById(productDTO.getCategoryId())
					.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
			product.setCategory(category);
		}
		product = productRepository.save(product);
		return toDTO(product);
	}

	@Override
	public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
		product.setName(productDTO.getName());
		product.setDescription(productDTO.getDescription());
		product.setPrice(productDTO.getPrice());
		if (productDTO.getCategoryId() != null) {
			Category category = categoryRepository.findById(productDTO.getCategoryId())
					.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
			product.setCategory(category);
		} else {
			product.setCategory(null);
		}
		product = productRepository.save(product);
		return toDTO(product);
	}

	@Override
	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ResourceNotFoundException("Produto não encontrado");
		}
		productRepository.deleteById(id);
	}

	private ProductDTO toDTO(Product product) {
		ProductDTO dto = new ProductDTO();
		dto.setId(product.getId());
		dto.setName(product.getName());
		dto.setDescription(product.getDescription());
		dto.setPrice(product.getPrice());
		dto.setCategoryId(product.getCategory() != null ? product.getCategory().getId() : null);
		return dto;
	}
}