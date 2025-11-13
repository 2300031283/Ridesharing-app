package com.example.demo.controller;

import com.example.demo.model.Profile;
import com.example.demo.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // ✅ POST /api/profiles - Create or update profile
    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrUpdateProfile(@RequestBody Profile profile) {
        try {
            Optional<Profile> existingProfile = profileService.findByEmail(profile.getEmail());
            
            Profile savedProfile;
            String message;
            
            if (existingProfile.isPresent()) {
                // Update existing profile
                Profile existingProf = existingProfile.get();
                if (profile.getFullName() != null) existingProf.setFullName(profile.getFullName());
                if (profile.getPhone() != null) existingProf.setPhone(profile.getPhone());
                if (profile.getGender() != null) existingProf.setGender(profile.getGender());
                if (profile.getDateOfBirth() != null) existingProf.setDateOfBirth(profile.getDateOfBirth());
                if (profile.getPostalAddress() != null) existingProf.setPostalAddress(profile.getPostalAddress());
                if (profile.getPaymentMethod() != null) existingProf.setPaymentMethod(profile.getPaymentMethod());
                if (profile.getPayoutMethod() != null) existingProf.setPayoutMethod(profile.getPayoutMethod());
                
                savedProfile = profileService.updateProfile(existingProf);
                message = "✅ Profile Updated Successfully!";
            } else {
                // Create new profile
                savedProfile = profileService.save(profile);
                message = "✅ Profile Created Successfully!";
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("message", message);
            response.put("profile", savedProfile);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to save profile: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ GET /api/profiles/{email} - Get profile by email
    @GetMapping("/{email}")
    public ResponseEntity<Map<String, Object>> getProfileByEmail(@PathVariable String email) {
        try {
            Optional<Profile> profile = profileService.findByEmail(email);
            
            if (profile.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Profile not found");
                return ResponseEntity.status(404).body(errorResponse);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("profile", profile.get());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch profile: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ GET /api/profiles/id/{id} - Get profile by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<Map<String, Object>> getProfileById(@PathVariable Long id) {
        try {
            Profile profile = profileService.getProfileById(id);
            
            if (profile == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Profile not found");
                return ResponseEntity.status(404).body(errorResponse);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ok");
            response.put("profile", profile);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch profile: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ✅ GET /api/profiles/fields/available - Get available profile fields
    @GetMapping("/fields/available")
    public ResponseEntity<Map<String, Object>> getAvailableFields() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("availableFields", new String[]{
            "Full Name",
            "Email",
            "Phone",
            "Gender",
            "Date of Birth",
            "Profile Image",
            "Average Rating",
            "Postal Address",
            "Payment Method",
            "Payout Method"
        });
        return ResponseEntity.ok(response);
    }
}
