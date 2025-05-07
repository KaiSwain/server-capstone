"use client";

import { useEffect, useState } from "react";
import { getUser } from "../data/user";
import { getOwnedDecks } from "../data/decks";
import Link from "next/link";
import { Profile } from "../components/profile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [ownedDecks, setOwnedDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUser().then(setProfile);
    getOwnedDecks().then((decks) => {
      setOwnedDecks(decks);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    // Your logout logic here
    router.push("/login");
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
  {/* Header */}
  <div className="flex justify-end">

    <button
      onClick={() => setShowModal(true)}
      className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-md"
      >
      🚪 Logout
    </button>
        </div>
  <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 px-4">
    <h1 className="flex justify-center m-auto text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500">
      👤 Your Profile
    </h1>
  </div>

  {/* Content Grid */}
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 px-4">
    {/* Profile Left */}
    <div className="w-full lg:w-1/3 flex justify-center">
      {profile && <Profile profile={profile} />}
    </div>

    {/* Decks Right */}
    <div className="w-full lg:w-2/3">
      <h2 className="text-2xl font-semibold mb-6">📚 Created Decks</h2>

      {ownedDecks.length === 0 ? (
        <p className="text-gray-400">You haven't created any decks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ownedDecks.map((deck) => (
            <Link key={deck.id} href={`/study/${deck.id}`}>
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 text-white rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-all border border-white/10">
                <h3 className="text-lg font-bold mb-1">{deck.title}</h3>
                <p className="text-sm text-white/80 mb-2">{deck.description}</p>
                <div className="flex justify-between text-sm text-white/70">
                  <span>🧠 {deck.category}</span>
                  <span>🔥 {deck.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Logout Modal (leave this the same) */}
</div>
  );
}