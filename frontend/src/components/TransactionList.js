import React, { useEffect, useState, useCallback } from "react";
import { getAll, deleteTransaction } from "../services/api";

const TYPE_ICON = { INCOME: "📈", EXPENSE: "📉" };

function TransactionList({ refreshKey }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fmt = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const fmtDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await getAll();
      setData(res.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setData((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const filtered = data.filter((t) => {
    const matchType =
      filter === "ALL" || t.type === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.category?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      String(t.amount).includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="glass-card list-card">
      {/* Header */}
      <div className="list-header">
        <h2>
          <span className="card-icon">📋</span>
          Transactions
        </h2>
        <span className="tx-count">{filtered.length} records</span>
      </div>

      {/* Filter pills */}
      <div className="filter-pills">
        {["ALL", "INCOME", "EXPENSE"].map((f) => (
          <button
            key={f}
            className={`pill ${filter === f ? "pill-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All" : f === "INCOME" ? "📈 Income" : "📉 Expense"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="tx-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by category, description or amount…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="empty-state">
          <div className="empty-icon loading-pulse">⏳</div>
          <p>Loading transactions…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🪙</div>
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="tx-list">
          {filtered.map((t, idx) => (
            <div
              key={t.id ?? idx}
              className={`tx-item ${t.type?.toLowerCase()}`}
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <div className="tx-dot">
                {TYPE_ICON[t.type] ?? "💸"}
              </div>

              <div className="tx-info">
                <div className="tx-category">{t.category}</div>
                <div className="tx-desc">
                  {t.description || t.type}
                </div>
              </div>

              <div className="tx-meta">
                <div className="tx-amount">{fmt(t.amount)}</div>
                <div className="tx-date">{fmtDate(t.date)}</div>
              </div>

              <button
                className="tx-delete"
                title="Delete"
                onClick={() => handleDelete(t.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;