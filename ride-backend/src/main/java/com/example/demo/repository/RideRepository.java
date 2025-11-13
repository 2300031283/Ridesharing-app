package com.example.demo.repository;

import com.example.demo.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findAllByOrderByCreatedAtDesc();

    @Modifying
    @Transactional
    @Query("update Ride r set r.vacancies = r.vacancies - 1 where r.id = :id and r.vacancies > 0")
    int decrementVacanciesIfAvailable(@Param("id") Long id);
}
