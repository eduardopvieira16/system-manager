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

import br.com.vieira.srv.manager.dto.ProductDTO;
import br.com.vieira.srv.manager.service.ProductService;

@RestController
@RequestMapping("/api/products/v1")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public List<ProductDTO> listProducts() {
		return productService.findAll();
	}

	@GetMapping("/{id}")
	public ProductDTO getProduct(@PathVariable Long id) {
		return productService.findById(id);
	}

	@PostMapping
	public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
		return productService.createProduct(productDTO);
	}

	@PutMapping("/{id}")
	public ProductDTO updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
		return productService.updateProduct(id, productDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
	}
}