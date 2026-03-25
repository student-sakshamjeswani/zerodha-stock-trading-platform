import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        "https://zerodha-stock-trading-platform-qb0o.onrender.com/signup",
        {
          ...formData,
          createdAt: new Date()
        },
      );
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      window.location.href = "https://zerodha-stock-trading-platform-2-r26t.onrender.com";

    }

    } catch (error) {
      if(error.response?.status === 400){
        setMessage("User already exists");
      } else{
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center">
      <div className="card signup-card shadow-lg p-4">
        <h3 className="text-center mb-4 fw-bold">Create Account</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
          <div className="text-center mt-3">
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;