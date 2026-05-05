import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import axios from "axios"

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQty, setStockQty] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [holdings, setHoldings] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", {
      withCredentials: true
    })
    .then(res => {
      if (res.data.status !== false) setUserAuthenticated(true);
    });

    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allHoldings", {
      withCredentials: true
    })
      .then(res => setHoldings(res.data));
  }, []);

  const handleBuyClick = async () => {
  if (!userAuthenticated) {
    alert("Please log in to place orders.");
    return;
  }

  try {
    await axios.post(
      "https://zerodha-stock-trading-platform-qb0o.onrender.com/newOrder",
      {
        name: uid,
        qty: stockQty,
        price: stockPrice,
        mode,
      },
      {
        withCredentials: true
      }
    );

    generalContext.closeBuyWindow();

  } catch (err) {
    console.log(err);
    alert("Order failed. Please try again.");
  }
};

  const handleCancelClick = () => generalContext.closeBuyWindow();

  const hasHolding = holdings.some(h => h.name === uid && h.qty > 0);

  return (
    <div className="containerClass" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQty}
              onChange={(e) => setStockQty(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>

        <div>
          <Link
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-red"}`}
            onClick={mode === "SELL" && !hasHolding ? null : handleBuyClick}
            style={{
              pointerEvents: mode === "SELL" && !hasHolding ? "none" : "auto",
              opacity: mode === "SELL" && !hasHolding ? 0.5 : 1
            }}
          >
            {mode}
          </Link>

          <Link className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;