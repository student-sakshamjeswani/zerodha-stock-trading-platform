import React, { useEffect, useState } from "react"; 
import axios from "axios";
import api from "./api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserAuthenticated(false);
      setLoading(false);
      return;
    }
    api.get("/allOrders")
      .then(res => setOrders(res.data))
      .catch(err => {
        console.log(err);
        alert("You must log in to view orders.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>
      </div>
    </div>
  );

  return (
    <div className="orders">
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
            {orders.map(order => (
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