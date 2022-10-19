import React from 'react';
import logo from './logo.svg';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./Pages/LoginAdmin";
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
