package com.example.demo.controller;

import com.example.demo.model.Refund;
import com.example.demo.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/refunds")
public class RefundController {
    @Autowired
    private RefundService refundService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> recordRefund(@RequestBody Refund refund) {
        try {
            Refund savedRefund = refundService.recordRefund(refund);
            // Build response with ride details from booking
            Map<String, Object> rideMap = new HashMap<>();
            if (savedRefund.getBooking() != null && savedRefund.getBooking().getRide() != null) {
                var ride = savedRefund.getBooking().getRide();
                rideMap.put("id", ride.getId());
                rideMap.put("name", ride.getName());
                rideMap.put("from_location", ride.getFrom());
                rideMap.put("to_location", ride.getTo());
                rideMap.put("price", ride.getPrice());
            }

            Map<String, Object> responseRefund = new HashMap<>();
            responseRefund.put("id", savedRefund.getId());
            responseRefund.put("bookingId", savedRefund.getBooking() != null ? savedRefund.getBooking().getId() : null);
            responseRefund.put("refundAmount", savedRefund.getRefundAmount());
            responseRefund.put("refundReason", savedRefund.getRefundReason());
            responseRefund.put("refundStatus", savedRefund.getRefundStatus());
            responseRefund.put("refundMethod", savedRefund.getRefundMethod());
            responseRefund.put("transactionId", savedRefund.getTransactionId());
            responseRefund.put("rideDetails", rideMap);
            responseRefund.put("createdAt", savedRefund.getCreatedAt());

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Refund recorded successfully");
            response.put("data", responseRefund);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRefunds() {
        try {
            List<Refund> refunds = refundService.getAllRefunds();
            List<Map<String, Object>> refundList = refunds.stream().map(r -> {
                Map<String, Object> rideMap = new HashMap<>();
                if (r.getBooking() != null && r.getBooking().getRide() != null) {
                    var ride = r.getBooking().getRide();
                    rideMap.put("id", ride.getId());
                    rideMap.put("name", ride.getName());
                    rideMap.put("from_location", ride.getFrom());
                    rideMap.put("to_location", ride.getTo());
                    rideMap.put("price", ride.getPrice());
                }

                Map<String, Object> map = new HashMap<>();
                map.put("id", r.getId());
                map.put("bookingId", r.getBooking() != null ? r.getBooking().getId() : null);
                map.put("refundAmount", r.getRefundAmount());
                map.put("refundReason", r.getRefundReason());
                map.put("refundStatus", r.getRefundStatus());
                map.put("refundMethod", r.getRefundMethod());
                map.put("transactionId", r.getTransactionId());
                map.put("rideDetails", rideMap);
                map.put("createdAt", r.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Refunds retrieved successfully");
            response.put("data", refundList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Map<String, Object>> getRefundsByBooking(@PathVariable Long bookingId) {
        try {
            List<Refund> refunds = refundService.getRefundsByBooking(bookingId);
            List<Map<String, Object>> refundList = refunds.stream().map(r -> {
                Map<String, Object> rideMap = new HashMap<>();
                if (r.getBooking() != null && r.getBooking().getRide() != null) {
                    var ride = r.getBooking().getRide();
                    rideMap.put("id", ride.getId());
                    rideMap.put("name", ride.getName());
                    rideMap.put("from_location", ride.getFrom());
                    rideMap.put("to_location", ride.getTo());
                    rideMap.put("price", ride.getPrice());
                }

                Map<String, Object> map = new HashMap<>();
                map.put("id", r.getId());
                map.put("bookingId", r.getBooking() != null ? r.getBooking().getId() : null);
                map.put("refundAmount", r.getRefundAmount());
                map.put("refundReason", r.getRefundReason());
                map.put("refundStatus", r.getRefundStatus());
                map.put("refundMethod", r.getRefundMethod());
                map.put("transactionId", r.getTransactionId());
                map.put("rideDetails", rideMap);
                map.put("createdAt", r.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Refunds retrieved successfully");
            response.put("data", refundList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Map<String, Object>> getRefundsByStatus(@PathVariable String status) {
        try {
            List<Refund> refunds = refundService.getRefundsByStatus(status);
            List<Map<String, Object>> refundList = refunds.stream().map(r -> {
                Map<String, Object> rideMap = new HashMap<>();
                if (r.getBooking() != null && r.getBooking().getRide() != null) {
                    var ride = r.getBooking().getRide();
                    rideMap.put("id", ride.getId());
                    rideMap.put("name", ride.getName());
                    rideMap.put("from_location", ride.getFrom());
                    rideMap.put("to_location", ride.getTo());
                    rideMap.put("price", ride.getPrice());
                }

                Map<String, Object> map = new HashMap<>();
                map.put("id", r.getId());
                map.put("bookingId", r.getBooking() != null ? r.getBooking().getId() : null);
                map.put("refundAmount", r.getRefundAmount());
                map.put("refundReason", r.getRefundReason());
                map.put("refundStatus", r.getRefundStatus());
                map.put("refundMethod", r.getRefundMethod());
                map.put("transactionId", r.getTransactionId());
                map.put("rideDetails", rideMap);
                map.put("createdAt", r.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Refunds retrieved successfully");
            response.put("data", refundList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
