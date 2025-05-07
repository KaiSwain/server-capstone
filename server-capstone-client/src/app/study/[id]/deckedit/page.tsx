"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDeckById, updateDeck } from "@/app/data/decks";

export default function EditDeck() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getDeckById(id).then((d) => {
      setDeck(d);
      setTitle(d.title);
      setDescription(d.description);
      setDifficulty(d.difficulty);
      setCards(d.cards || []);
    });
  }, [id]);

  const handleCardChange = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDeck = {
      title,
      description,
      difficulty,
      cards,
    };

    updateDeck(id, updatedDeck)
      .then(() => router.push(`/study/${id}`))
      .catch((err) => {
        console.error("Error updating deck:", err);
        alert("Failed to update deck.");
      });
  };

  if (!deck) return <p className="text-white p-6">Loading deck...</p>;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Deck</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-xl space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {cards.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">🧠 Edit Cards</h2>
            {cards.map((card, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded space-y-2">
                <input
                  type="text"
                  value={card.front}
                  onChange={(e) => handleCardChange(index, "front", e.target.value)}
                  placeholder="Front (question)"
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                  type="text"
                  value={card.back}
                  onChange={(e) => handleCardChange(index, "back", e.target.value)}
                  placeholder="Back (answer)"
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
                />
                <select
                  value={card.difficulty}
                  onChange={(e) => handleCardChange(index, "difficulty", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
