package com.example.customer.service;

import com.example.customer.domain.Product;
import com.example.customer.dto.ProductCreateRequest;
import com.example.customer.dto.ProductDto;
import com.example.customer.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> listAll() {
        return productRepository.findAllByOrderByProductIdAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public ProductDto create(ProductCreateRequest request) {
        Product product = Product.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .precio(request.getPrecio())
                .build();
        return toDto(productRepository.save(product));
    }

    private ProductDto toDto(Product p) {
        return ProductDto.builder()
                .id(p.getProductId())
                .nombre(p.getNombre())
                .descripcion(p.getDescripcion())
                .precio(p.getPrecio())
                .build();
    }
}
