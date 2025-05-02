"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleNavbar}
        className={`fixed top-4 z-50 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition ${
          isOpen ? "left-56" : "left-4"
        }`}
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-52 bg-gray-900 text-white p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 mt-8">
          <li className="hover:text-cyan-300 cursor-pointer"><Link href={'/'}> Home </Link></li>
          <li className="hover:text-cyan-300 cursor-pointer">Browse Decks</li>
          <li className="hover:text-cyan-300 cursor-pointer"><Link href={'/create'}> Create Deck </Link></li>
          <li className="hover:text-cyan-300 cursor-pointer">Liked Decks</li>
          <li className="hover:text-cyan-300 cursor-pointer">Progress</li>
          <li className="hover:text-cyan-300 cursor-pointer">Profile / Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;