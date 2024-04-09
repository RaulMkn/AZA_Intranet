package com.example.utils;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Enums {

    public enum ApointmentStates {
        Pendiente,
        Cancelada,
        Completa
    }
    public enum PaymentState {
        Pagado,
        Pendiente,
        Devuelto
    }
    public enum ApointmentPriorities {
        Alta,
        Baja,
        Media
    }
}
