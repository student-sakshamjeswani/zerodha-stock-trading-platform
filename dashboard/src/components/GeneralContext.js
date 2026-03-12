import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import axios from "axios";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  // Check login
  useEffect(() => {
    axios
      .get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.status !== false) setIsAuth(true);
      })
      .catch(() => setIsAuth(false));
  }, []);

  const handleOpenBuyWindow = (uid, mode) => {
    if (!isAuth) {
      alert("Please log in to place orders");
      return;
    }
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={orderMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;