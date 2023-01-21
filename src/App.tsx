import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SurveyBuilder from './pages/admin/SurveyBuilderAdmin';
import Results from './pages/admin/ResultsAdmin';
import PaymentManager from './pages/admin/PaymentManagerAdmin';
import Survey from './pages/user/Survey';
import PhoneEntry from "./pages/user/PhoneEntry";
import OTPCodeEntry from "./pages/user/OTPCodeEntry"
import ResumeSurvey from "./pages/user/ResumeSurvey"
import ReceivePayment from './pages/user/ReceivePayment';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
        <Route path="/SurveyBuilderAdmin" element={<SurveyBuilder/>} />
        <Route path="/ResultsAdmin" element={<Results/>} />
        <Route path="/PaymentManagerAdmin" element={<PaymentManager/>} />
        <Route path="/Survey" element={<Survey/>} />
        <Route path="/PhoneEntry" element={<PhoneEntry/>} />
        <Route path="/OTPCodeEntry" element={<OTPCodeEntry/>} />
        <Route path="/ResumeSurvey" element={<ResumeSurvey/>} />
        <Route path="/ReceivePayment" element={<ReceivePayment/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
