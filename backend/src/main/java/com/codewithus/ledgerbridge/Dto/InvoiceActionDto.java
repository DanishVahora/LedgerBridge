package com.codewithus.ledgerbridge.Dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceActionDto {

    @NotBlank(message = "Buyer username is required")
    private String buyerusername;

    @Size(max = 500, message = "Remark must not exceed 500 characters")
    private String remark;
}
