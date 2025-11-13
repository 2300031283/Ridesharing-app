package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String paymentType; // "RIDE_FARE", "DEPOSIT", "REFUND", etc.

    @Column(nullable = false)
    private String paymentStatus; // "PENDING", "COMPLETED", "FAILED", "REFUNDED"

    @Column(name = "payment_method")
    private String paymentMethod; // "CARD", "UPI", "WALLET", "CASH"

    @Column(columnDefinition = "TEXT")
    private String transactionId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = System.currentTimeMillis();
    }
}
