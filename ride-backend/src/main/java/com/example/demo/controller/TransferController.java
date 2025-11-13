package com.example.demo.controller;

import com.example.demo.model.Transfer;
import com.example.demo.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
    @Autowired
    private TransferService transferService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> recordTransfer(@RequestBody Transfer transfer) {
        try {
            Transfer savedTransfer = transferService.recordTransfer(transfer);
            Map<String, Object> responseTransfer = new HashMap<>();
            responseTransfer.put("id", savedTransfer.getId());
            responseTransfer.put("fromUser", savedTransfer.getFromUser());
            responseTransfer.put("toUser", savedTransfer.getToUser());
            responseTransfer.put("amount", savedTransfer.getAmount());
            responseTransfer.put("reason", savedTransfer.getReason());
            responseTransfer.put("transferStatus", savedTransfer.getTransferStatus());
            responseTransfer.put("createdAt", savedTransfer.getCreatedAt());

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Transfer recorded successfully");
            response.put("data", responseTransfer);
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
    public ResponseEntity<Map<String, Object>> getAllTransfers() {
        try {
            List<Transfer> transfers = transferService.getAllTransfers();
            List<Map<String, Object>> transferList = transfers.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", t.getId());
                map.put("fromUser", t.getFromUser());
                map.put("toUser", t.getToUser());
                map.put("amount", t.getAmount());
                map.put("reason", t.getReason());
                map.put("transferStatus", t.getTransferStatus());
                map.put("createdAt", t.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Transfers retrieved successfully");
            response.put("data", transferList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/sent-by/{fromUser}")
    public ResponseEntity<Map<String, Object>> getTransfersSentBy(@PathVariable String fromUser) {
        try {
            List<Transfer> transfers = transferService.getTransfersSentBy(fromUser);
            List<Map<String, Object>> transferList = transfers.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", t.getId());
                map.put("fromUser", t.getFromUser());
                map.put("toUser", t.getToUser());
                map.put("amount", t.getAmount());
                map.put("reason", t.getReason());
                map.put("transferStatus", t.getTransferStatus());
                map.put("createdAt", t.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Transfers retrieved successfully");
            response.put("data", transferList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/received-by/{toUser}")
    public ResponseEntity<Map<String, Object>> getTransfersReceivedBy(@PathVariable String toUser) {
        try {
            List<Transfer> transfers = transferService.getTransfersReceivedBy(toUser);
            List<Map<String, Object>> transferList = transfers.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", t.getId());
                map.put("fromUser", t.getFromUser());
                map.put("toUser", t.getToUser());
                map.put("amount", t.getAmount());
                map.put("reason", t.getReason());
                map.put("transferStatus", t.getTransferStatus());
                map.put("createdAt", t.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Transfers retrieved successfully");
            response.put("data", transferList);
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
    public ResponseEntity<Map<String, Object>> getTransfersByStatus(@PathVariable String status) {
        try {
            List<Transfer> transfers = transferService.getTransfersByStatus(status);
            List<Map<String, Object>> transferList = transfers.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", t.getId());
                map.put("fromUser", t.getFromUser());
                map.put("toUser", t.getToUser());
                map.put("amount", t.getAmount());
                map.put("reason", t.getReason());
                map.put("transferStatus", t.getTransferStatus());
                map.put("createdAt", t.getCreatedAt());
                return map;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Transfers retrieved successfully");
            response.put("data", transferList);
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
