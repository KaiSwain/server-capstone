"use client";

import { useState } from "react";
import { postDeck } from "../data/decks";

export default function Create() {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [cardDifficulty, setCardDifficulty] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const categoryOptions = ["Faith", "Science", "History", "Coding", "Other"];
  const difficultyOptions = ["Easy", "Medium", "Hard"];

  const addOrUpdateCard = () => {
    if (!front.trim() || !back.trim() || !cardDifficulty) return;
    const newCard = { front, back, difficulty: cardDifficulty };

    if (editIndex !== null) {
      const updated = [...cards];
      updated[editIndex] = newCard;
      setCards(updated);
      setEditIndex(null);
    } else {
      setCards([...cards, newCard]);
    }

    setFront("");
    setBack("");
    setCardDifficulty("");
  };

  const editCard = (index: number) => {
    const card = cards[index];
    setFront(card.front);
    setBack(card.back);
    setCardDifficulty(card.difficulty);
    setEditIndex(index);
  };

  const deleteCard = (index: number) => {
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
    if (editIndex === index) {
      setFront("");
      setBack("");
      setCardDifficulty("");
      setEditIndex(null);
    }
  };

  const handleSubmitDeck = () => {
    if (!deckTitle || !deckDescription || !selectedDifficulty || !selectedCategory || cards.length === 0) {
      alert("Please fill out all fields and add at least one card.");
      return;
    }

    const deck = {
      title: deckTitle,
      description: deckDescription,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      cards,
    };

    postDeck(deck);
    console.log("Deck submitted:", deck);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-8">
        ✨ Create Your Deck
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Deck title"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 placeholder-gray-400"
        />

        <textarea
          placeholder="Deck description"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 placeholder-gray-400"
          rows={3}
        />

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800"
        >
          <option value="">Select deck difficulty</option>
          {difficultyOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800"
        >
          <option value="">Select deck category</option>
          {categoryOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <hr className="my-8 border-gray-600" />

      <h2 className="text-2xl font-semibold mb-4">🧠 Add a Card</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Front (question)"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Back (answer)"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 placeholder-gray-400"
        />
        <select
          value={cardDifficulty}
          onChange={(e) => setCardDifficulty(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800"
        >
          <option value="">Select card difficulty</option>
          {difficultyOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button
          onClick={addOrUpdateCard}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg shadow"
        >
          {editIndex !== null ? "Update Card" : "➕ Add Card"}
        </button>
      </div>

      {cards.length > 0 && (
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">📦 Cards in Deck</h2>
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-2"
            >
              <div>
                <span className="text-sm font-light">Front:</span>
                <p className="text-lg font-medium">{card.front}</p>
              </div>
              <div>
                <span className="text-sm font-light">Back:</span>
                <p className="text-lg font-medium">{card.back}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Difficulty: {card.difficulty}</span>
                <div className="flex gap-3">
                  <button onClick={() => editCard(index)} className="hover:underline text-yellow-400">
                    Edit
                  </button>
                  <button onClick={() => deleteCard(index)} className="hover:underline text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmitDeck}
        className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-lg"
      >
        ✅ Submit Deck
      </button>
    </div>
  );
}
