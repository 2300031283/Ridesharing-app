package com.example.demo.controller;

import com.example.demo.model.Ride;
import com.example.demo.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;

    // ✅ POST /api/rides/offer - Create a new ride
    @PostMapping("/offer")
    public ResponseEntity<Map<String, Object>> offerRide(@RequestBody Ride ride) {
        try {
            Ride savedRide = rideService.save(ride);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("message", "🚗 Ride offered successfully!");
            response.put("ride", savedRide);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to offer ride: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ GET /api/rides - Get all rides
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRides() {
        try {
            List<Ride> rides = rideService.getAllRides();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("data", rides);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch rides: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ GET /api/rides/{id} - Get a specific ride
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRideById(@PathVariable Long id) {
        try {
            Ride ride = rideService.getRideById(id);
            
            if (ride == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Ride not found");
                return ResponseEntity.status(404).body(errorResponse);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("data", ride);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch ride: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ DELETE /api/rides/{id} - Delete a ride
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRide(@PathVariable Long id) {
        try {
            rideService.deleteRide(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("message", "Ride deleted successfully!");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to delete ride: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // NOTE: booking is handled by BookingController now (atomic operation)
}
