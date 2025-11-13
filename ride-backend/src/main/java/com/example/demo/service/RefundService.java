package com.example.demo.service;

import com.example.demo.model.Refund;
import com.example.demo.repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RefundService {
    @Autowired
    private RefundRepository refundRepository;

    @Transactional
    public Refund recordRefund(Refund refund) {
        return refundRepository.save(refund);
    }

    @Transactional(readOnly = true)
    public List<Refund> getRefundsByBooking(Long bookingId) {
        return refundRepository.findByBookingId(bookingId);
    }

    @Transactional(readOnly = true)
    public List<Refund> getRefundsByStatus(String status) {
        return refundRepository.findByRefundStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Refund> getAllRefunds() {
        return refundRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public Refund getRefundById(Long id) {
        return refundRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteRefund(Long id) {
        refundRepository.deleteById(id);
    }
}
