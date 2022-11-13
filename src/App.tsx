import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SurveyBuilder from './pages/admin/SurveyBuilderAdmin';
import Results from './pages/admin/ResultsAdmin';
import PaymentManager from './pages/admin/PaymentManagerAdmin';
import PhoneEntry from "./pages/surveytaker/PhoneEntry";
import OTPCodeEntry from "./pages/surveytaker/OTPCodeEntry"
import './App.css';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
        <Route path="/SurveyBuilderAdmin" element={<SurveyBuilder/>} />
        <Route path="/ResultsAdmin" element={<Results/>} />
        <Route path="/PaymentManagerAdmin" element={<PaymentManager/>} />
        <Route path="/PhoneEntry" element={<PhoneEntry/>} />
        <Route path="/OTPCodeEntry" element={<OTPCodeEntry/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
