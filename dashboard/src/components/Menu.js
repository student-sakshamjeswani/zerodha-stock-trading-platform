import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedmenu] = useState(0);
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("");

  // Fetch user info from backend
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3002/me", {
        withCredentials: true, // important to send JWT cookie
      });
      setUsername(res.data.username || "User");
      setEmail(res.data.email || "");
    } catch (err) {
      console.log("Error fetching user:", err);
      setUsername("User");
      setEmail("");
    }
  };

  useEffect(() => {
    fetchUser(); // fetch when Menu mounts
  }, []);

  // Optional: refetch after login/signup
  useEffect(() => {
    const handleLoginEvent = () => fetchUser();
    window.addEventListener("userLogin", handleLoginEvent);
    return () => window.removeEventListener("userLogin", handleLoginEvent);
  }, []);

  const handleMenuClick = (index) => setSelectedmenu(index);
  const handleProfileClick = () =>
    setIsProfileDropDownOpen(!isProfileDropDownOpen);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3002/logout",
        {},
        { withCredentials: true },
      );
      setUsername("User");
      setEmail("");
      window.location.href = "http://localhost:3000/login"; // redirect
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const menuClass = "menu";
  const activemenuClass = "menu selected";
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          {" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              {" "}
              <p className={selectedMenu === 0 ? activemenuClass : menuClass}>
                Dashboard
              </p>{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              {" "}
              <p className={selectedMenu === 1 ? activemenuClass : menuClass}>
                Orders
              </p>{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              {" "}
              <p className={selectedMenu === 2 ? activemenuClass : menuClass}>
                Holdings
              </p>{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              {" "}
              <p className={selectedMenu === 3 ? activemenuClass : menuClass}>
                Positions
              </p>{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              {" "}
              <p className={selectedMenu === 4 ? activemenuClass : menuClass}>
                Funds
              </p>{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              {" "}
              <p className={selectedMenu === 5 ? activemenuClass : menuClass}>
                Apps
              </p>{" "}
            </Link>{" "}
          </li>{" "}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{avatarLetter}</div>
          <p className="username">{username}</p>

          {isProfileDropDownOpen && (
            <div className="profile-dropdown">
              <p className="dropdown-username">{username}</p>
              {email && <p className="dropdown-email">{email}</p>}
              <hr />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
