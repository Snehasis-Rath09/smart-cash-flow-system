import React, { useEffect, useState, useCallback } from "react";
import { getSummary } from "../services/api";

function Dashboard({ refreshKey }) {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    forecast: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await getSummary();
      setSummary(res.data);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(fetchSummary, 5000);
    return () => clearInterval(interval);
  }, [fetchSummary, refreshKey]);

  const fmt = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const cards = [
    {
      key: "balance",
      cls: "balance",
      icon: "💰",
      label: "Net Balance",
      value: summary.balance,
    },
    {
      key: "income",
      cls: "income",
      icon: "📈",
      label: "Total Income",
      value: summary.income,
    },
    {
      key: "expenses",
      cls: "expense",
      icon: "📉",
      label: "Total Expenses",
      value: summary.expenses,
    },
    {
      key: "forecast",
      cls: "forecast",
      icon: "🔮",
      label: "Forecast",
      value: summary.forecast,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div key={c.key} className={`stat-card ${c.cls}`}>
          <div className="stat-icon">{c.icon}</div>
          <div className="stat-label">{c.label}</div>
          <div className={`stat-value ${loading ? "loading-pulse" : ""}`}>
            {loading ? "—" : fmt(c.value)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;