import React, { useEffect, useState } from "react";
import api from "./api"; 
import "./User.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    api.get("/me")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
        setUser(null);
      })
      .finally(() => setLoading(false));

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userLogout"));
    window.location.href =
      "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
  };

  const handleLoginRedirect = () => {
    window.location.href =
      "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
  };

  if (loading) return <h3>Loading account info...</h3>;

  if (!user) {
    return (
      <div className="account-container">
        <div className="account-card">
          <h3>You are not logged in</h3>
          <button className="login-btn" onClick={handleLoginRedirect}>
            Log In
          </button>
        </div>
      </div>
    );
  }

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