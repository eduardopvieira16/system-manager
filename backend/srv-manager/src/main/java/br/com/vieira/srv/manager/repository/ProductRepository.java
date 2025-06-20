package br.com.vieira.srv.manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vieira.srv.manager.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAll();
}
