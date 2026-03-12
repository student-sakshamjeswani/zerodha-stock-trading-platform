import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.status === false) {
          setIsAuth(false);
          window.location.href =
            "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
        } else {
          setIsAuth(true);
        }
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