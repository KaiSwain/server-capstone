"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  PlusSquare,
  Heart,
  BarChart2,
  User,
} from "lucide-react"; // Install via `npm i lucide-react`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  


  useEffect(() => {
    const token = localStorage.getItem("game_token");
    setIsLoggedIn(!!token);
    const handleLoggedOut = () => setIsLoggedIn(false);
    const handleLoggedIn = () => setIsLoggedIn(true);

    window.addEventListener("logged out", handleLoggedOut);
    window.addEventListener("logged in", handleLoggedIn);

    return () => {
      window.removeEventListener("logged out", handleLoggedOut);
      window.removeEventListener("logged in", handleLoggedIn);
    };
  }, [window]);


  if (isLoggedIn){

    return (
      <>
      {/* Toggle Button */}
      <button
        onClick={toggleNavbar}
        className={`fixed top-4 z-50 p-2 text-white rounded-full shadow-lg bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 transition-all duration-300 ${
          isOpen ? "left-60" : "left-4"
          }`}
          >
        {isOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-56 bg-gray-950 text-white px-4 py-6 transition-transform duration-300 z-40 border-r border-white/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          >
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 mb-8 text-center tracking-wide">
          FlipQuest
        </h2>

        {/* Nav Links */}
        <ul className="space-y-5">
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <Home size={20} /> <Link href="/">Home</Link>
          </li>
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <BookOpen size={20} /> Browse Decks
          </li>
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <PlusSquare size={20} /> <Link href="/create">Create Deck</Link>
          </li>
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <Heart size={20} /> <Link href="/likedPage"> Liked Decks </Link>
          </li>
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <BarChart2 size={20} /> Progress
          </li>
          <li className="flex items-center gap-3 hover:text-cyan-300 transition-all">
            <User size={20} /> <Link href="/profile">Profile / Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
};

export default Navbar;