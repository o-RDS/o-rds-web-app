import React from 'react';
import logo from './logo.svg';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./Pages/LoginAdmin";
import DashboardAdmin from "./Pages/DashboardAdmin";
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
