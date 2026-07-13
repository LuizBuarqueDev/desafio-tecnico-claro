package com.claro.desafio.pedidos.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}
