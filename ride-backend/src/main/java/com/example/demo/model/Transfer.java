package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transfers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fromUser; // sender name

    @Column(nullable = false)
    private String toUser; // receiver name

    @Column(nullable = false)
    private Double amount;

    @Column(columnDefinition = "TEXT")
    private String reason; // "Payment to driver", "Refund", etc.

    @Column(nullable = false)
    private String transferStatus; // "PENDING", "COMPLETED", "FAILED"

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = System.currentTimeMillis();
    }
}
