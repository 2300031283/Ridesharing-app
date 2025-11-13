package com.example.demo.repository;

import com.example.demo.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    @Query("SELECT t FROM Transfer t WHERE t.fromUser = :fromUser ORDER BY t.createdAt DESC")
    List<Transfer> findByFromUser(@Param("fromUser") String fromUser);

    @Query("SELECT t FROM Transfer t WHERE t.toUser = :toUser ORDER BY t.createdAt DESC")
    List<Transfer> findByToUser(@Param("toUser") String toUser);

    @Query("SELECT t FROM Transfer t WHERE t.transferStatus = :status ORDER BY t.createdAt DESC")
    List<Transfer> findByTransferStatus(@Param("status") String status);

    @Query("SELECT t FROM Transfer t ORDER BY t.createdAt DESC")
    List<Transfer> findAllByOrderByCreatedAtDesc();
}
