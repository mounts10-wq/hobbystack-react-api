const STORAGE_KEY = "savedBooks";

export function getSavedBooks() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function saveBook(book) {
  const savedBooks = getSavedBooks();
  const alreadySaved = savedBooks.some((savedBook) => savedBook.key === book.key);

  if (alreadySaved) {
    return { added: false, books: savedBooks };
  }

  const updatedBooks = [...savedBooks, book];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

  return { added: true, books: updatedBooks };
}

export function removeSavedBook(bookKey) {
  const savedBooks = getSavedBooks();
  const updatedBooks = savedBooks.filter((book) => book.key !== bookKey);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
  return updatedBooks;
}