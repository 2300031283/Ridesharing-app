package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody Map<String, Object> body) {
        try {
            Long bookingId = body.get("bookingId") == null ? null : Long.valueOf(String.valueOf(body.get("bookingId")));
            String senderName = body.get("senderName") == null ? null : String.valueOf(body.get("senderName"));
            String senderType = body.get("senderType") == null ? "passenger" : String.valueOf(body.get("senderType"));
            String messageText = body.get("messageText") == null ? null : String.valueOf(body.get("messageText"));

            if (bookingId == null || senderName == null || messageText == null) {
                Map<String, Object> err = new HashMap<>();
                err.put("status", "error");
                err.put("message", "bookingId, senderName, and messageText are required");
                return ResponseEntity.badRequest().body(err);
            }

            Message message = messageService.sendMessage(bookingId, senderName, senderType, messageText);
            if (message == null) {
                Map<String, Object> err = new HashMap<>();
                err.put("status", "error");
                err.put("message", "Booking not found");
                return ResponseEntity.status(404).body(err);
            }

            Map<String, Object> resp = new HashMap<>();
            resp.put("status", "ok");
            resp.put("message", "Message sent");
            // Return simplified message without full booking/ride objects to avoid lazy-load serialization issues
            Map<String, Object> msgData = new HashMap<>();
            msgData.put("id", message.getId());
            msgData.put("senderName", message.getSenderName());
            msgData.put("senderType", message.getSenderType());
            msgData.put("messageText", message.getMessageText());
            msgData.put("createdAt", message.getCreatedAt());
            resp.put("data", msgData);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "error");
            err.put("message", e.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Map<String, Object>> getMessages(@PathVariable Long bookingId) {
        try {
            List<Message> messages = messageService.getMessagesByBooking(bookingId);
            // Return simplified messages without full booking/ride objects
            List<Map<String, Object>> simplifiedMessages = messages.stream()
                    .map(m -> {
                        Map<String, Object> msgMap = new HashMap<>();
                        msgMap.put("id", m.getId());
                        msgMap.put("senderName", m.getSenderName());
                        msgMap.put("senderType", m.getSenderType());
                        msgMap.put("messageText", m.getMessageText());
                        msgMap.put("createdAt", m.getCreatedAt());
                        return msgMap;
                    })
                    .toList();
            
            Map<String, Object> resp = new HashMap<>();
            resp.put("status", "ok");
            resp.put("data", simplifiedMessages);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "error");
            err.put("message", e.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }
}
