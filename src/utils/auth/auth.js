//const baseUrl = "http://localhost:3001";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "put the URL for your deployed backend here, including https://"
    : "http://localhost:3001";
import { checkResponse } from "../Api";

export function register(email, password, name, avatar) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
