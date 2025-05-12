"use client";

import { useEffect, useState } from "react";
import Navbar from "../navbar";
import AuthCheck from "./authchecker";

export default function AuthWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("game_token");
    setShowNavbar(!!token);
  }, []);

  if (!isClient) return null; // prevent hydration mismatch

  return (
    <AuthCheck>
      {showNavbar && <Navbar />}
      {children}
    </AuthCheck>
  );
}