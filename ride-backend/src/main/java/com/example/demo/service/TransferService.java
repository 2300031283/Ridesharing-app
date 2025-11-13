package com.example.demo.service;

import com.example.demo.model.Transfer;
import com.example.demo.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransferService {
    @Autowired
    private TransferRepository transferRepository;

    @Transactional
    public Transfer recordTransfer(Transfer transfer) {
        return transferRepository.save(transfer);
    }

    @Transactional(readOnly = true)
    public List<Transfer> getTransfersSentBy(String fromUser) {
        return transferRepository.findByFromUser(fromUser);
    }

    @Transactional(readOnly = true)
    public List<Transfer> getTransfersReceivedBy(String toUser) {
        return transferRepository.findByToUser(toUser);
    }

    @Transactional(readOnly = true)
    public List<Transfer> getTransfersByStatus(String status) {
        return transferRepository.findByTransferStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Transfer> getAllTransfers() {
        return transferRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public Transfer getTransferById(Long id) {
        return transferRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteTransfer(Long id) {
        transferRepository.deleteById(id);
    }
}
