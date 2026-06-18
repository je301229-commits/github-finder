const BASE_URL = "https://api.github.com";

export async function searchUsers(query) {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data.items;
}

export async function getUser(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
}

export async function getUserRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}