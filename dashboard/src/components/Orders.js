import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/allOrders", {
      withCredentials: true
    })

    .then((res) => {

      if (Array.isArray(res.data)) {
        setOrders(res.data);
        setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
      }
    })
    .catch(() => {
      setUserAuthenticated(false);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!userAuthenticated) {
    return (
      <div>
        <p>Please login to view orders</p>

        <button
          onClick={() =>
            window.location.href =
            "https://zerodha-stock-trading-platform-1-w5l7.onrender.com/login"
          }
          className="login-btn"
        >
          Login
        </button>
      </div>
    );
  }

  if (orders.length === 0) {

    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">

      <h3 className="title">
        Orders ({orders.length})
      </h3>

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

            {orders.map((order) => (

              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td>{order.mode}</td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Orders;