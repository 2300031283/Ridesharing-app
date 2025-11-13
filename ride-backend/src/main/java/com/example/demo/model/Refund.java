package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "refunds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private Double refundAmount;

    @Column(nullable = false)
    private String refundReason; // "Ride Cancelled", "Driver No Show", "Issue with Ride", etc.

    @Column(nullable = false)
    private String refundStatus; // "PENDING", "COMPLETED", "FAILED"

    @Column(name = "refund_method", nullable = false)
    private String refundMethod; // "CARD", "WALLET", "BANK_TRANSFER"

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = System.currentTimeMillis();
    }
}
