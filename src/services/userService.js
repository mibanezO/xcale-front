export async function fetchUser(phone) {
  let success = false;
  let user = null;
  let error = null;
  try {
    const response = await fetch(`http://localhost:8080/api/user/${phone}`);
    if (response.ok) {
      user = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, user, error };
}

export async function saveNewUser(user) {
  let success = false;
  let saved = null;
  let error = null;
  try {
    const response = await fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      saved = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {
      console.log(ex);
  }
  return { success, saved, error };
}
