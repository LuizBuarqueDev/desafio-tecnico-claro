package com.claro.desafio.pedidos.enums;

public enum OrderStatus {
    EM_PROCESSAMENTO,
    PAUSADO,
    CANCELADO;

    public boolean canTransitionTo(OrderStatus target) {
        return switch (this) {
            case EM_PROCESSAMENTO -> target == PAUSADO || target == CANCELADO;
            case PAUSADO -> target == EM_PROCESSAMENTO || target == CANCELADO;
            case CANCELADO -> target == EM_PROCESSAMENTO;
        };
    }
}