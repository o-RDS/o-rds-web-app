import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import './App.css';
import SurveyBuilder from './pages/admin/SurveyBuilder';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
        <Route path="/SurveyBuilder" element={<SurveyBuilder/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
