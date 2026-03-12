import React, {useEffect, useState} from "react";
import axios from 'axios';

import {positions} from '../data/data.js';

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
      axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allPositions").then((res) => {
        console.log(res.data);
        setAllPositions(res.data);
      });
    }, []);
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