import React, { useEffect, useState } from "react"; 
import axios from 'axios';

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", { withCredentials: true })
      .then(res => {
        if(res.data.status !== false){
          setUserAuthenticated(true);

          // Fetch positions only if authenticated
          axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allPositions", { withCredentials: true })
            .then((res) => setAllPositions(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch(() => setUserAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login";
  };

  if (loading) return <p>Loading positions...</p>;

  if (!userAuthenticated) {
    return (
      <div className="positions-container">
        <p>You need to log in to view positions.</p>
        <button className="login-btn" onClick={handleLoginRedirect}>Log In</button>
      </div>
    );
  }

  if (allPositions.length === 0) return <p>No positions to display.</p>;

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock) => {
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;