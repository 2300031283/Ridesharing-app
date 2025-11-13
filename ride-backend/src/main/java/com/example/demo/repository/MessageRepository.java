package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.booking.id = :bookingId order by m.createdAt asc")
    List<Message> findByBookingIdOrderByCreatedAtAsc(@Param("bookingId") Long bookingId);

    @Query("select distinct m from Message m left join fetch m.booking where m.booking.id in :bookingIds order by m.createdAt desc")
    List<Message> findLatestMessages(@Param("bookingIds") List<Long> bookingIds);
}
