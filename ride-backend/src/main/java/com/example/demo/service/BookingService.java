package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.Ride;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;

    @Transactional(readOnly = true)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Booking createBooking(Long rideId, String bookerName, String bookerContact) {
        // attempt to decrement vacancies atomically
        int updated = rideRepository.decrementVacanciesIfAvailable(rideId);
        if (updated <= 0) {
            return null; // no seats or ride missing
        }

        Ride ride = rideRepository.findById(rideId).orElse(null);
        if (ride == null) return null; // safety

        Booking booking = Booking.builder()
                .ride(ride)
                .bookerName(bookerName)
                .bookerContact(bookerContact)
                .build();

        return bookingRepository.save(booking);
    }
}
