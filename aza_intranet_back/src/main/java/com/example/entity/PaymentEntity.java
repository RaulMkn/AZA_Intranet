package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payments")
public class PaymentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String provider;

    private String service;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp payment_date;

    private BigDecimal price;

    private String state;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "responsible_dentist")
    private DentistEntity responsible_dentist;

    private String comment;

    private String payment_receipt;

    private String bank_extract;

}