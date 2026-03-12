import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQty, setStockQty] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [holdings, setHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () =>{
    await axios.post("https://zerodha-stock-trading-platform-qb0o.onrender.com/newOrder", 
      {
        name: uid,
        qty: stockQty,
        price: stockPrice,
        mode: mode,
      },
      {
        withCredentials: true   // 👈 ye add karo
      }
    );

    generalContext.closeBuyWindow();
  }

  useEffect(() => {
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allHoldings", {
      withCredentials: true
    }).then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const hasHolding = holdings.some(h => h.name === uid && h.qty > 0);

  return (
    <div className="containerClass" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" name="qty" id="qty" onChange={(e) => setStockQty(e.target.value)} value={stockQty}/>
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input type="number" name="price" id="price" step="0.05" onChange={(e) => setStockPrice(e.target.value)} value={stockPrice}/>
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
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;