package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.Message;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public Message sendMessage(Long bookingId, String senderName, String senderType, String messageText) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) {
            return null;
        }

        Message message = Message.builder()
                .booking(booking)
                .senderName(senderName)
                .senderType(senderType) // "passenger" or "driver"
                .messageText(messageText)
                .build();

        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessagesByBooking(Long bookingId) {
        return messageRepository.findByBookingIdOrderByCreatedAtAsc(bookingId);
    }

    @Transactional(readOnly = true)
    public List<Message> getAllConversations() {
        // Get all messages to show unique conversations grouped by booking
        return messageRepository.findAll();
    }
}
