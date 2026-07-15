const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  if (!query?.trim()) {
    return [];
  }

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&limit=12`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  return data.docs;
}

export function getCoverUrl(coverId) {
  if (!coverId) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}