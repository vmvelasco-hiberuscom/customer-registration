package com.example.customer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {
    private String status;
    private CustomerData data;
    private ErrorInfo error;

    public static RegistrationResponse success(CustomerData data) {
        return RegistrationResponse.builder()
            .status("success")
            .data(data)
            .build();
    }

    public static RegistrationResponse error(String errorCode, String message) {
        return RegistrationResponse.builder()
            .status("error")
            .error(ErrorInfo.builder().errorCode(errorCode).message(message).build())
            .build();
    }
}
