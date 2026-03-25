import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setIsAuth(false);
      window.location.href =
        "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
      return;
    }
    api.get("/me")
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
        window.location.href =
          "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
      });
  }, []);
  if (isAuth === null) return <h3>Loading...</h3>;
  return isAuth ? children : null;
};

export default ProtectedRoute;