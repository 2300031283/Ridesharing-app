package com.example.demo.repository;

import com.example.demo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("select distinct b from Booking b left join fetch b.ride order by b.createdAt desc")
    List<Booking> findAllByOrderByCreatedAtDesc();
}
