import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [username, setUsername] = useState("User");

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://zerodha-stock-trading-platform-qb0o.onrender.com/me", { withCredentials: true });
      if (res.data.status !== false) setUsername(res.data.username || "User");
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
      <img src="logo.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activemenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activemenuClass : menuClass}>Orders</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activemenuClass : menuClass}>Holdings</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activemenuClass : menuClass}>Positions</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activemenuClass : menuClass}>Funds</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activemenuClass : menuClass}>Apps</p>
            </Link>
          </li>

          {/* Profile Section */}
          <li>
            <Link style={{ textDecoration: "none" }} to="/accounts">
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