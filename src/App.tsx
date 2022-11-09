import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SurveyBuilder from './pages/admin/SurveyBuilderAdmin';
import Results from './pages/admin/ResultsAdmin';
import PaymentManager from './pages/admin/PaymentManagerAdmin';
import './App.css';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
      </Routes>
    </HashRouter>
  )
}

export default App;
