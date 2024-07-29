const baseUrl = "http://localhost:3001";

async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

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
  });
}

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
}

export { getItems, addNewItem, deleteItemById };

//imageUrl to link
