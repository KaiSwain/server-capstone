"use client";

import { getDeckById } from "@/app/data/decks";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Profile } from "@/app/components/profile";
import { getUser } from "@/app/data/user";

export default function Flashcards() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [profile, setProfile] = useState({});

  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-pink-500 to-yellow-500",
    "from-green-400 to-blue-500",
    "from-orange-400 to-red-500",
    "from-sky-400 to-cyan-600",
  ];

  useEffect(() => {
    getUser().then((u) => setProfile(u));
  }, []);

  useEffect(() => {
    getDeckById(id).then((d) => setDeck(d));
  }, [id]);

  if (!deck) return <div className="text-white p-6">Loading deck...</div>;
  if (!deck.cards || deck.cards.length === 0)
    return <div className="text-white p-6">No cards found.</div>;

  const currentCard = deck.cards[currentIndex];
  const cardGradient = gradients[currentIndex % gradients.length];

  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setFlipped(false);
      setTimeout(() => {setCurrentIndex((prev) => prev + 1)},300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
      }, 300);
    }
  };

  const handleDone = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500">
        {deck.title}
      </h1>

      <div className="mb-4 text-sm font-medium text-pink-300 uppercase tracking-widest">
        Difficulty: {currentCard.difficulty}
      </div>

      {/* Flashcard */}
      <div
        className="relative w-full max-w-[500px] aspect-[3/2] cursor-pointer rounded-3xl shadow-2xl border border-white/10 hover:border-pink-500 transition-all"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full rounded-3xl bg-gradient-to-br ${cardGradient} text-white flex items-center justify-center p-6 text-center text-xl sm:text-2xl font-bold shadow-xl`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="break-words leading-relaxed">{currentCard.front}</p>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-zinc-800 to-gray-900 text-white flex items-center justify-center p-6 text-center rotate-y-180 shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="break-words leading-relaxed text-base sm:text-lg font-medium">{currentCard.back}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-4 mb-6">Click the card to flip</p>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ⬅️ Previous
        </button>

        {currentIndex < deck.cards.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 transition"
          >
            Next ➡️
          </button>
        ) : (
          <button
            onClick={handleDone}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition"
          >
            ✅ Done
          </button>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Card {currentIndex + 1} of {deck.cards.length}
      </p>

      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
      >
        🔙 Back
      </button>

      <div className="mt-16">
        <Profile profile={profile} />
      </div>
    </div>
  );
}
