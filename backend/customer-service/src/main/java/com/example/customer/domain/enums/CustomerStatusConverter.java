package com.example.customer.domain.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CustomerStatusConverter implements AttributeConverter<CustomerStatus, String> {

    @Override
    public String convertToDatabaseColumn(CustomerStatus status) {
        if (status == null) {
            return null;
        }
        return status.name().toLowerCase();
    }

    @Override
    public CustomerStatus convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return CustomerStatus.valueOf(value.toUpperCase());
    }
}
