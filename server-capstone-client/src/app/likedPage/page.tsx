"use client";

import { useEffect, useState } from "react";
import { getLikedDecks } from "@/app/data/decks";
import Link from "next/link";
import { Profile } from "../components/profile";
import { getUser } from "../data/user";

export default function LikedDecks() {
  const [likedDecks, setLikedDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser().then(setProfile);
  }, []);

  useEffect(() => {
    getLikedDecks()
      .then((decks) => {
        setLikedDecks(decks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch liked decks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 mb-10">
        💖 Liked Decks
      </h1>

      {likedDecks.length === 0 ? (
        <p className="text-gray-400 text-lg mb-20">You haven't liked any decks yet.</p>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
          {likedDecks.map((deck) => (
            <Link href={`/study/${deck.id}`} key={deck.id}>
              <div className="rounded-xl p-[2px] bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 hover:scale-[1.02] transition-transform">
                <div className="bg-black rounded-xl p-6 h-full flex flex-col justify-between shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-2">{deck.title}</h2>
                  <p className="text-sm text-gray-300 mb-4">{deck.description}</p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p><span className="font-semibold text-white">Category:</span> {deck.category}</p>
                    <p><span className="font-semibold text-white">Difficulty:</span> {deck.difficulty}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Profile profile={profile} />
    </div>
  );
}