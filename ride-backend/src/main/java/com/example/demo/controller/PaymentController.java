package com.example.demo.controller;

import com.example.demo.model.Payment;
import com.example.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> recordPayment(@RequestBody Payment payment) {
        try {
            Payment savedPayment = paymentService.recordPayment(payment);
            // Return simplified response without nested booking/ride
            Map<String, Object> responsePayment = new HashMap<>();
            responsePayment.put("id", savedPayment.getId());
            responsePayment.put("bookingId", savedPayment.getBooking() != null ? savedPayment.getBooking().getId() : null);
            responsePayment.put("amount", savedPayment.getAmount());
            responsePayment.put("paymentType", savedPayment.getPaymentType());
            responsePayment.put("paymentStatus", savedPayment.getPaymentStatus());
            responsePayment.put("paymentMethod", savedPayment.getPaymentMethod());
            responsePayment.put("transactionId", savedPayment.getTransactionId());
            responsePayment.put("createdAt", savedPayment.getCreatedAt());

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Payment recorded successfully");
            response.put("data", responsePayment);
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
    public ResponseEntity<Map<String, Object>> getAllPayments() {
        try {
            List<Payment> payments = paymentService.getAllPayments();
            List<Map<String, Object>> paymentList = payments.stream().map(p -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", p.getId());
                map.put("bookingId", p.getBooking() != null ? p.getBooking().getId() : null);
                map.put("amount", p.getAmount());
                map.put("paymentType", p.getPaymentType());
                map.put("paymentStatus", p.getPaymentStatus());
                map.put("paymentMethod", p.getPaymentMethod());
                map.put("transactionId", p.getTransactionId());
                map.put("createdAt", p.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Payments retrieved successfully");
            response.put("data", paymentList);
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
    public ResponseEntity<Map<String, Object>> getPaymentsByBooking(@PathVariable Long bookingId) {
        try {
            List<Payment> payments = paymentService.getPaymentsByBooking(bookingId);
            List<Map<String, Object>> paymentList = payments.stream().map(p -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", p.getId());
                map.put("bookingId", p.getBooking() != null ? p.getBooking().getId() : null);
                map.put("amount", p.getAmount());
                map.put("paymentType", p.getPaymentType());
                map.put("paymentStatus", p.getPaymentStatus());
                map.put("paymentMethod", p.getPaymentMethod());
                map.put("transactionId", p.getTransactionId());
                map.put("createdAt", p.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Payments retrieved successfully");
            response.put("data", paymentList);
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
    public ResponseEntity<Map<String, Object>> getPaymentsByStatus(@PathVariable String status) {
        try {
            List<Payment> payments = paymentService.getPaymentsByStatus(status);
            List<Map<String, Object>> paymentList = payments.stream().map(p -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", p.getId());
                map.put("bookingId", p.getBooking() != null ? p.getBooking().getId() : null);
                map.put("amount", p.getAmount());
                map.put("paymentType", p.getPaymentType());
                map.put("paymentStatus", p.getPaymentStatus());
                map.put("paymentMethod", p.getPaymentMethod());
                map.put("transactionId", p.getTransactionId());
                map.put("createdAt", p.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Payments retrieved successfully");
            response.put("data", paymentList);
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
