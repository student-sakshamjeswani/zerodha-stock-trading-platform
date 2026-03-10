import React from "react";
import "./Apps.css";

const apps = [
  { name: "Market Movers", desc: "Top gainers and losers in the market" },
  { name: "Stock Screener", desc: "Filter stocks based on criteria" },
  { name: "Portfolio Analytics", desc: "Analyze your portfolio performance" },
  { name: "Stock News", desc: "Latest news about stocks and companies" },
  { name: "IPO Tracker", desc: "Track upcoming and active IPOs" },
  { name: "Watchlist Manager", desc: "Manage your stock watchlists" },
];

function Apps() {
  return (
    <div className="apps-container">
      <h2 className="apps-title">Apps</h2>

      <div className="apps-grid">
        {apps.map((app, index) => (
          <div className="app-card" key={index}>
            <h3>{app.name}</h3>
            <p>{app.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apps;