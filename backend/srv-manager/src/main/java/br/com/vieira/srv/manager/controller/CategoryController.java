package br.com.vieira.srv.manager.controller;

import br.com.vieira.srv.manager.dto.CategoryDTO;
import br.com.vieira.srv.manager.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:9091")
@RestController
@RequestMapping("/api/categories/v1")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> listCategories() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public CategoryDTO getCategory(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
        return categoryService.createCategory(categoryDTO);
    }

    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return categoryService.updateCategory(id, categoryDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}