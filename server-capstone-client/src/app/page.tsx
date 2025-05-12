"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDecks } from "./data/decks";
import { getUser } from "./data/user";
import { Profile } from "./components/profile";

export default function AllDecksView() {
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const decksPerPage = 6;

  useEffect(() => {
    getDecks().then(setDecks);
    getUser().then(setUser);
  }, []);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const getCategoryGradient = (category) => {
    switch ((category || "").toLowerCase()) {
      case "science":
        return "from-green-400 via-blue-500 to-purple-600";
      case "math":
        return "from-yellow-400 via-orange-500 to-red-600";
      case "history":
        return "from-rose-400 via-pink-500 to-fuchsia-600";
      case "language":
        return "from-sky-400 via-cyan-500 to-teal-600";
      case "art":
        return "from-pink-400 via-rose-500 to-yellow-500";
      default:
        return "from-indigo-500 via-purple-500 to-pink-500";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(decks.length / decksPerPage);
  const startIndex = (currentPage - 1) * decksPerPage;
  const currentDecks = decks.slice(startIndex, startIndex + decksPerPage);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 mb-10">
        FlipQuest
      </h1>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Deck Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {currentDecks.map((d) => (
              <Link href={`/study/${d.id}`} key={d.id}>
                <div
                  className={`group relative w-full max-w-[400px] h-[200px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${getCategoryGradient(
                    d.category || ""
                  )} hover:scale-[1.03] transition-transform duration-300`}
                >
                  <div className="absolute inset-0 backdrop-blur-sm z-10 p-4 flex flex-col justify-between rounded-xl">
                    <div className="text-sm text-pink-200 font-medium">
                      by {d.creator.username}
                    </div>
                    <div className="text-xl font-bold text-center break-words">
                      {d.title}
                    </div>
                    <div className="flex justify-between text-sm text-gray-200">
                      <span>{d.category}</span>
                      <span>{d.difficulty}</span>
                      <span>❤️ {d.likes}</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-full h-full rounded-xl bg-black opacity-10 blur-2xl" />
                </div>
              </Link>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="col-span-full flex justify-center gap-4 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
                >
                  ⬅️ Prev
                </button>
                <span className="text-sm pt-2 text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 disabled:opacity-40"
                >
                  Next ➡️
                </button>
              </div>
            )}
          </div>

          {/* Profile Card */}
          <div className="w-full lg:w-[280px] lg:sticky lg:top-24 shrink-0">
            {user && <Profile profile={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}
