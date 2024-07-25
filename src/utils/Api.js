const baseUrl = "http://localhost:3001";

async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

async function addNewItem({ name, link, weather }) {
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
  });
}

function deleteCard(cardId) {
  return this._addNewItem(`/items/${cardId}`, "DELETE");
}

export { getItems, addNewItem, deleteCard };

//imageUrl to link
