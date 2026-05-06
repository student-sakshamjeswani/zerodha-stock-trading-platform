import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import axios from "axios"

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("");
  const [isAuth, setIsAuth] = useState(false);
 
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuth(false);
          return;
        }
        const res = await axios.get(
          "https://zerodha-stock-trading-platform-qb0o.onrender.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (res.data.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuth(false);
      }
    };
    checkUser();
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

      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};
export default GeneralContext;