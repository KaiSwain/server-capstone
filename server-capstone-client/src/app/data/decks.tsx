import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";
const tokenString = localStorage.getItem("game_token");
const tokenObj = JSON.parse(tokenString);
const token = tokenObj.token;
export const getDecks = () => {
  return fetchWithResponse("decks", {
    headers: { Authorization: `Token ${token}` },
  });
};
export const getLikedDecks = () => {
  return fetchWithResponse("decks/likeddecks", {
    headers: { Authorization: `Token ${token}` },
  });
};
export const getOwnedDecks = () => {
  return fetchWithResponse("decks/owned", {
    headers: { Authorization: `Token ${token}` },
  });
};

export const getDeckById = (id) => {
  return fetchWithResponse(`decks/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
};

export const postDeck = (deckObj) => {
  return fetchWithResponse(`decks`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deckObj),
  });
};

export const deleteDeck = (id) => {
  return fetchWithResponse(`decks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Token ${token}` },
  });
};

export const likeDeck = (deck_id_obj) => {
  return fetchWithResponse(`like_deck/toggle`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck_id_obj),
  });
};

export const updateDeck = (id, deckObj) => {
  return fetchWithResponse(`decks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deckObj),
  })
}

