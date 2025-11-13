package com.example.demo.repository;

import com.example.demo.model.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefundRepository extends JpaRepository<Refund, Long> {
    @Query("SELECT r FROM Refund r LEFT JOIN FETCH r.booking b LEFT JOIN FETCH b.ride WHERE r.booking.id = :bookingId ORDER BY r.createdAt DESC")
    List<Refund> findByBookingId(@Param("bookingId") Long bookingId);

    @Query("SELECT r FROM Refund r LEFT JOIN FETCH r.booking b LEFT JOIN FETCH b.ride ORDER BY r.createdAt DESC")
    List<Refund> findAllByOrderByCreatedAtDesc();

    @Query("SELECT r FROM Refund r LEFT JOIN FETCH r.booking b LEFT JOIN FETCH b.ride WHERE r.refundStatus = :status ORDER BY r.createdAt DESC")
    List<Refund> findByRefundStatus(@Param("status") String status);
}
