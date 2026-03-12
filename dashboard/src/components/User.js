import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://zerodha-stock-trading-platform-qb0o.onrender.com/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  if (!user) return <h3>Loading account info...</h3>; // still show loading while fetching

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>Account Information</h2>

        <div className="account-field">
          <span>Username</span>
          <p>{user.username}</p>
        </div>

        <div className="account-field">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;