import React, { useState } from "react";
import { addTransaction } from "../services/api";

const CATEGORIES = {
  INCOME:  ["Salary", "Freelance", "Investment", "Business", "Bonus", "Other"],
  EXPENSE: ["Rent", "Groceries", "Transport", "Utilities", "Healthcare", "Entertainment", "Shopping", "Education", "Other"],
};

function AddTransaction({ onAdded }) {
  const [type, setType]             = useState("INCOME");
  const [category, setCategory]     = useState("");
  const [amount, setAmount]         = useState("");
  const [date, setDate]             = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading]       = useState(false);
  const [toast, setToast]           = useState(null);

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    setLoading(true);
    try {
      await addTransaction({ type, category, amount: parseFloat(amount), date, description });
      setCategory("");
      setAmount("");
      setDate("");
      setDescription("");
      showToast(" Transaction added!");
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Error adding transaction", err);
      showToast(" Failed to add transaction", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="glass-card">
        <h2>
          <span className="card-icon">➕</span>
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Type toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={type === "INCOME" ? "active-income" : ""}
              onClick={() => handleTypeChange("INCOME")}
            >
              📈 Income
            </button>
            <button
              type="button"
              className={type === "EXPENSE" ? "active-expense" : ""}
              onClick={() => handleTypeChange("EXPENSE")}
            >
              📉 Expense
            </button>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category…</option>
              {CATEGORIES[type].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              min="1"
              step="0.01"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <input
              type="text"
              placeholder="Brief note…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Saving…" : "Add Transaction"}
          </button>
        </form>
      </div>

      {toast && (
        <div className={`toast ${toast.isError ? "error" : ""}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}

export default AddTransaction;