package br.com.vieira.srv.manager.service;

import java.util.List;

import br.com.vieira.srv.manager.dto.ProductDTO;

public interface ProductService {
	List<ProductDTO> findAll();

	ProductDTO findById(Long id);

	ProductDTO createProduct(ProductDTO productDTO);

	ProductDTO updateProduct(Long id, ProductDTO productDTO);

	void deleteProduct(Long id);
}