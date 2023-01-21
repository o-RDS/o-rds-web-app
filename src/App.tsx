import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        <Route path="admin">
          <Route path="login" element={<LoginAdmin/>} />
          <Route path="dashboard" element={<DashboardAdmin/>} />
          <Route path="results" element={<Results/>} />
          <Route path="payment-manager" element={<PaymentManager/>} />
          <Route path="survey-builder" element={<SurveyBuilder/>} />
        </Route>
        <Route path="survey">
          <Route path=":id">
            <Route path="" element={<PhoneEntry/>} />
            <Route path="verify" element={<OTPCodeEntry/>} />
            <Route path="questions" element={<Survey/>} />
            <Route path="resume" element={<ResumeSurvey/>} />
            <Route path="reward" element={<ReceivePayment/>} />
          </Route>
        </Route>
        {/*Default Path For Development*/}
        <Route path="/" element={<LoginAdmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
