import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./MainRoutes/LoginPage";
import RegisterPage from "./MainRoutes/RegisterPage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}