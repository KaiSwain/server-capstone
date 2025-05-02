import { fetchWithoutResponse, fetchWithResponse } from "./fetcher";

const tokenString = localStorage.getItem("game_token")
const tokenObj = JSON.parse(tokenString)
const token = tokenObj.token
export const getUser = () => {
    return fetchWithResponse("user/profile", {
        headers: { Authorization: `Token ${token}` }
    });
}