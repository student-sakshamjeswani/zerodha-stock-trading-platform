import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [username, setUsername] = useState("User");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUsername("User");
        return;
      }
      const res = await api.get("/me");

      setUsername(res.data.username || "User");

    } catch (err) {
      setUsername("User");
    }
  };

  useEffect(() => {
    fetchUser();
    const handleLoginEvent = () => fetchUser();
    window.addEventListener("userLogin", handleLoginEvent);
    return () => window.removeEventListener("userLogin", handleLoginEvent);
  }, []);

  const handleMenuClick = (index) => setSelectedMenu(index);

  const menuClass = "menu";
  const activemenuClass = "menu selected";
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activemenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>

          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activemenuClass : menuClass}>Orders</p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activemenuClass : menuClass}>Holdings</p>
            </Link>
          </li>

          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activemenuClass : menuClass}>Positions</p>
            </Link>
          </li>

          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activemenuClass : menuClass}>Funds</p>
            </Link>
          </li>

          <li>
            <Link to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activemenuClass : menuClass}>Apps</p>
            </Link>
          </li>

          {/* Profile Section */}
          <li>
            <Link to="/accounts">
              <div className="profile">
                <div className="avatar">{avatarLetter}</div>
                <p className="username">{username}</p>
              </div>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Menu;