package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllBookings() {
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            Map<String, Object> resp = new HashMap<>();
            resp.put("status", "ok");
            resp.put("data", bookings);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "error");
            err.put("message", e.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Map<String, Object> body) {
        try {
            Long rideId = body.get("rideId") == null ? null : Long.valueOf(String.valueOf(body.get("rideId")));
            String name = body.get("name") == null ? null : String.valueOf(body.get("name"));
            String contact = body.get("contact") == null ? null : String.valueOf(body.get("contact"));

            if (rideId == null) {
                Map<String, Object> err = new HashMap<>();
                err.put("status", "error");
                err.put("message", "rideId is required");
                return ResponseEntity.badRequest().body(err);
            }

            Booking booking = bookingService.createBooking(rideId, name, contact);
            if (booking == null) {
                Map<String, Object> err = new HashMap<>();
                err.put("status", "error");
                err.put("message", "Ride not found or no vacancies available");
                return ResponseEntity.status(400).body(err);
            }

            Map<String, Object> resp = new HashMap<>();
            resp.put("status", "ok");
            resp.put("message", "Booking created");
            resp.put("booking", booking);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "error");
            err.put("message", e.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }
}
