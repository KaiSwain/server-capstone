"use client";

import { useState } from "react";

export default function Create() {
  const [deckTitle, setDeckTitle] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [cards, setCards] = useState([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addOrUpdateCard = () => {
    if (!front.trim() || !back.trim()) return;

    if (editIndex !== null) {
      // Editing existing card
      const updatedCards = [...cards];
      updatedCards[editIndex] = { front, back };
      setCards(updatedCards);
      setEditIndex(null);
    } else {
      // Adding new card
      setCards([...cards, { front, back }]);
    }

    setFront("");
    setBack("");
  };

  const editCard = (index: number) => {
    const card = cards[index];
    setFront(card.front);
    setBack(card.back);
    setEditIndex(index);
  };

  const deleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    if (editIndex === index) {
      setFront("");
      setBack("");
      setEditIndex(null);
    }
  };

  const handleSubmitDeck = () => {
    if (!deckTitle.trim() || cards.length === 0) {
      alert("Give your deck a title and at least one card.");
      return;
    }

    const deck = {
      title: deckTitle,
      cards: cards,
    };

    console.log("Deck submitted:", deck);
    // TODO: POST to backend

    setDeckTitle("");
    setCards([]);
    setFront("");
    setBack("");
    setEditIndex(null);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Create a New Deck</h1>

      <input
        type="text"
        placeholder="Deck title"
        value={deckTitle}
        onChange={(e) => setDeckTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Card Input */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Card back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={addOrUpdateCard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editIndex !== null ? "Update Card" : "Add Card"}
        </button>
      </div>

      {/* List of Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Cards in Deck</h2>
        <ul className="space-y-2">
          {cards.map((card, index) => (
            <li
              key={index}
              className="border p-3 rounded bg-white shadow-sm flex justify-between items-start"
            >
              <div>
                <strong>Front:</strong> {card.front} <br />
                <strong>Back:</strong> {card.back}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editCard(index)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCard(index)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmitDeck}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Deck
      </button>
    </div>
  );
}