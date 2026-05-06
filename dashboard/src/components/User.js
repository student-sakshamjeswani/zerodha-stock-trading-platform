import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }
        const res = await axios.get(
          "https://zerodha-stock-trading-platform-qb0o.onrender.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/logout", {}, {
      headers: {
            Authorization: `Bearer ${token}`
      }
    });

    localStorage.removeItem("token");

    window.location.href = "https://zerodha-stock-trading-frontend.netlify.app/login";
  };

  if (loading) {
    return (
      <div className="account-container">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="account-container">
        <div className="login-required">
          <h2>You are not logged in</h2>

          <p>Please login to access your account.</p>

          <button
            className="login-btn"
            onClick={() =>
              (window.location.href =
                "https://zerodha-stock-trading-frontend.netlify.app/login")
            }
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">

        <h2>My Account</h2>

        <div className="account-field">
          <span>USERNAME</span>
          <p>{user.username}</p>
        </div>

        <div className="account-field">
          <span>EMAIL</span>
          <p>{user.email}</p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Account;