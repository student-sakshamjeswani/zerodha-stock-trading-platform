import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home.js";

const params = new URLSearchParams(window.location.search);

const tokenFromUrl = params.get("token");

if (tokenFromUrl) {
  localStorage.setItem("token", tokenFromUrl);

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

