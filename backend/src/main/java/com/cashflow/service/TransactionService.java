package com.cashflow.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cashflow.entity.Transaction;
import com.cashflow.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repo;

    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public Transaction save(Transaction t) {
        return repo.save(t);
    }

    public List<Transaction> getAll() {
        return repo.findAllOrderedByDateDesc();
    }

    public double getTotalIncome() {
        return repo.sumIncome();
    }

    public double getTotalExpenses() {
        return repo.sumExpenses();
    }

    public double getBalance() {
        return getTotalIncome() - getTotalExpenses();
    }

    
    public double forecast() {
        long count = repo.count();
        if (count == 0) return 0;

        double avgIncome   = getTotalIncome()   / count;
        double avgExpenses = getTotalExpenses() / count;
        return getBalance() + (avgIncome - avgExpenses);
    }

  
    public void delete(Long id) {
        repo.deleteById(id);
    }


    public Map<String, Double> getSummary() {
        return Map.of(
            "balance",   getBalance(),
            "income",    getTotalIncome(),
            "expenses",  getTotalExpenses(),
            "forecast",  forecast()
        );
    }
}