export async function saveGroup(group) {
  let success = false;
  let saved = null;
  let error = null;
  try {
    const response = await fetch("http://localhost:8080/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    if (response.ok) {
      saved = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, saved, error };
}

export async function fetchGroup(id) {
  let success = false;
  let group = null;
  let error = null;
  try {
    const response = await fetch(`http://localhost:8080/api/group/${id}`);
    if (response.ok) {
      group = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, group, error };
}

export async function fetchForNumber(number) {
  let success = false;
  let groups = [];
  let error = null;
  try {
    const response = await fetch(
      `http://localhost:8080/api/group/user/${number}`
    );
    if (response.ok) {
      groups = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, groups, error };
}

export async function addToGroup(groupId, number) {
  let success = false;
  let userGroup = null;
  let error = null;
  try {
    const request = {
      userNumber: number,
      groupId,
    };
    console.log('Sending ', request);
    const response = await fetch('http://localhost:8080/api/group/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      userGroup = await response.json();
    } else {
      error = await response.json();
    }
    success = response.ok;
  } catch (ex) {}
  return { success, userGroup, error };
}
