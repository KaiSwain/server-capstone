
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";
const tokenString = localStorage.getItem("game_token")
const tokenObj = JSON.parse(tokenString)
const token = tokenObj.token
export const getDecks = () => {
  return fetchWithResponse("decks", {
    headers: { Authorization: `Token ${token}` },
  });
};
export const getDeckById = (id) => {
  return fetchWithResponse(`decks/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
};
