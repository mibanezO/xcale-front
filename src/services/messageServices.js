export async function loadMessages(groupId, page = 0) {
  let success = false;
  let messages = [];
  let error = null;
  try {
    const url = `http://localhost:8080/api/messages/${groupId}?page=${page}`;
    const response = await fetch(url);
    if (response.ok) {
      messages = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, messages, error };
}

export async function publishMessage(groupId, message) {
  let success = false;
  let error = null;
  try {
    const url = `http://localhost:8080/api/messages/${groupId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, error };
}
