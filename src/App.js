import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./MainRoutes/LoginPage";
import RegisterPage from "./MainRoutes/RegisterPage";
import TimelinePage from "./MainRoutes/TimelinePage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}