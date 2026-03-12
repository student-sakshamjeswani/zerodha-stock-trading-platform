import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home.js";
import ProtectedRoute from "./components/ProtectedRoute.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

