import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  LandingPage,
  Analytics,
  FormDashboard,
  FormWorkspace,
  Settings,
  UserForm,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<FormDashboard />}></Route>
        <Route path="/analytics/:formId" element={<Analytics />}></Route>
        <Route path="/createform/:formId" element={<FormWorkspace />}></Route>
        <Route path="/form/:id" element={<UserForm />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
