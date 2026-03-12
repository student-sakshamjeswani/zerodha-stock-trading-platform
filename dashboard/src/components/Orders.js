import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allOrders", {
      withCredentials: true
    })
    .then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);
  return (
    <div className="orders">
        {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div> ) : (
     <div>
       <h3 className="title">Orders ({orders.length})</h3>

       <div className="order-table">
       <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>{order.mode}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
     </div>
      )}
    </div>
  );
};

export default Orders;