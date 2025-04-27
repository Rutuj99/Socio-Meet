import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Home from "../Components/Home";
import ProfilePage from "../Components/ProfilePage";
import Error404 from "../Components/Error404";

export default function RouteSurf() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/404" element={<Error404 />} />
    </Routes>
  );
}
