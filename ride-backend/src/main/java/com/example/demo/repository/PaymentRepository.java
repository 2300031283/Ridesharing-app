package com.example.demo.repository;

import com.example.demo.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p WHERE p.booking.id = :bookingId ORDER BY p.createdAt DESC")
    List<Payment> findByBookingId(@Param("bookingId") Long bookingId);

    @Query("SELECT p FROM Payment p ORDER BY p.createdAt DESC")
    List<Payment> findAllByOrderByCreatedAtDesc();

    @Query("SELECT p FROM Payment p WHERE p.paymentStatus = :status ORDER BY p.createdAt DESC")
    List<Payment> findByPaymentStatus(@Param("status") String status);

    @Query("SELECT p FROM Payment p WHERE p.paymentType = :type ORDER BY p.createdAt DESC")
    List<Payment> findByPaymentType(@Param("type") String type);
}
