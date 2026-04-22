import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", {
      withCredentials: true
    })
    .then(res => {
      if (res.data.status === false) setUser(null);
      else setUser(res.data);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/logout", {
      withCredentials: true
    });
    window.location.href = "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
  };

  if (loading) return <h3>Loading...</h3>;

  if (!user) {
    return (
      <div>
        <h3>You are not logged in</h3>
        <button onClick={() => window.location.href = "/login"}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;