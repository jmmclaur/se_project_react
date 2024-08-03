import { processServerResponse } from "./processServer";
const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}
/* async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
} new above */

async function addNewItem(name, link, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
      weather,
    }),
  }).then(processServerResponse);
  /*.then((res) => {
    return checkResponse(res);
  }); */
}

function deleteItemById(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(processServerResponse);
}
/*
async function deleteItemById(Id) {
  const res = await fetch(`${baseUrl}/items/${Id}`, {
    method: "DELETE",
  });
  return checkResponse(res);
} 

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
} new above */

export { getItems, addNewItem, deleteItemById };

//imageUrl to link
