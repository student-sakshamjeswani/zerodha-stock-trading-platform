import React, { useEffect, useState } from "react";
import api from "./api";
import { VericalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserAuthenticated(false);
      setLoading(false);
      return;
    }

    setUserAuthenticated(true);

    api.get("/allHoldings")
      .then(res => setAllHoldings(res.data))
      .catch(err => {
        console.log(err);
        setUserAuthenticated(false);
      })
      .finally(() => setLoading(false));

  }, []);

  if (loading) return <p>Loading holdings...</p>;

  if (!userAuthenticated) return <p>Please log in to view holdings.</p>;

  if (allHoldings.length === 0) return <p>You don't have any holdings.</p>;

  const labels = allHoldings.map(stock => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock price",
        data: allHoldings.map(stock => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map(stock => {
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <VericalGraph data={data} />
    </>
  );
};

export default Holdings;