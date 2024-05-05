import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login";
import NotFoundPage from "./components/NotFoundPage";
import DashboardPage from "./components/dashboard";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
