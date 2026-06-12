import React, { useState, useCallback } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="logo-row">
          <div className="logo-icon">💵</div>
          <h1>Smart Cash Flow</h1>
        </div>
        <p>Track income & expenses</p>
      </header>

      <Dashboard refreshKey={refreshKey} />

      <div className="main-grid">
        <AddTransaction onAdded={handleAdded} />
        <TransactionList refreshKey={refreshKey} />
      </div>
    </div>
  );
}

export default App;