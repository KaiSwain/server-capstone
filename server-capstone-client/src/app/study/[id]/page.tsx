"use client";

import { Profile } from "@/app/components/profile";
import { getDeckById, deleteDeck, likeDeck } from "@/app/data/decks";
import { getUser } from "@/app/data/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeckDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser().then((user) => setProfile(user));
  }, []);

  useEffect(() => {
    getDeckById(id).then((res) => setDeck(res));
  }, [id]);

  const handleDelete = () => {
    deleteDeck(id).then(() => router.push("/"));
  };

  const handleEdit = () => {
    router.push(`/study/${id}/deckedit`);
  };

  const handleLike = () => {
    const deckObj = { deck: id };
    likeDeck(deckObj).then(() => {
      getDeckById(id).then((res) => setDeck(res));
    });
  };

  const handleReady = () => {
    router.push(`/study/${id}/flashcards`);
  };

  const getCategoryGradient = (category) => {
    switch ((category || "").toLowerCase()) {
      case "science":
        return "from-green-400 to-blue-500";
      case "math":
        return "from-yellow-400 to-red-500";
      case "history":
        return "from-pink-400 to-rose-500";
      case "language":
        return "from-sky-400 to-teal-500";
      case "art":
        return "from-purple-400 to-pink-600";
      default:
        return "from-indigo-500 to-purple-500";
    }
  };

  if (!deck) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center px-4 py-10 min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
        {deck.difficulty}
      </h1>

      {/* Card */}
      <div
        className="w-full max-w-[500px] max-h-90 lg:min-w-[600px] sm:max-w-sm md:max-w-md aspect-[3/2] relative mb-6 cursor-pointer shadow-2xl rounded-3xl border border-white/10 hover:border-purple-500 transition-all"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 ${flipped ? "rotate-y-180" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full rounded-3xl bg-gradient-to-br ${getCategoryGradient(deck.category)} flex items-center justify-center text-2xl font-extrabold shadow-xl text-white`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {deck.title}
          </div>

          {/* Back */}
          <div
            className={`absolute w-full h-full rounded-3xl bg-gradient-to-br ${getCategoryGradient(deck.category)} text-white flex items-center justify-center px-6 py-4 text-center rotate-y-180 shadow-xl`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-base sm:text-lg font-medium">{deck.description}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-2 mb-6">Tap the card to flip</p>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
        {deck.is_owner && (
          <>
            <button
              onClick={handleEdit}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl shadow-md w-full"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow-md w-full"
            >
              🗑️ Delete
            </button>
          </>
        )}
        <button
          onClick={handleLike}
          className={`${
            deck.is_liked
              ? "bg-pink-700 hover:bg-pink-700"
              : "bg-gray-600 hover:bg-gray-700"
          } text-white py-2 rounded-xl shadow-md w-full`}
        >
          {deck.is_liked ? "💖 Liked" : "❤️ Like"}
        </button>
        <button
          onClick={handleReady}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl shadow-md w-full"
        >
          ✅ Ready
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-6 max-w-sm text-white text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This will permanently delete the deck.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10">by {deck.creator.username}</div>
      {/* Profile */}
      <div className="mt-16">
        <Profile profile={profile} />
      </div>
    </div>
  );
}
