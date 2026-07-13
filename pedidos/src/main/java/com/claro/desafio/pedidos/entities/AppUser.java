package com.claro.desafio.pedidos.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.management.relation.Role;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Table(name = "app_user")
public class AppUser extends BaseEntity{

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Role role;
}
