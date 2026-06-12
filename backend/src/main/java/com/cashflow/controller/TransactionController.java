package com.cashflow.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cashflow.entity.Transaction;
import com.cashflow.service.TransactionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> add(@RequestBody Transaction t) {
        return ResponseEntity.ok(service.save(t));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> all() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/balance")
    public ResponseEntity<Double> balance() {
        return ResponseEntity.ok(service.getBalance());
    }

    @GetMapping("/income")
    public ResponseEntity<Double> income() {
        return ResponseEntity.ok(service.getTotalIncome());
    }

    @GetMapping("/expenses")
    public ResponseEntity<Double> expenses() {
        return ResponseEntity.ok(service.getTotalExpenses());
    }

    @GetMapping("/forecast")
    public ResponseEntity<Double> forecast() {
        return ResponseEntity.ok(service.forecast());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Double>> summary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}