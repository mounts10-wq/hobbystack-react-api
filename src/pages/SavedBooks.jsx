import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { getSavedBooks, removeSavedBook } from "../services/savedBooksStorage";

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    setSavedBooks(getSavedBooks());

    function handleStorageChange(event) {
      if (event.key === "savedBooks") {
        setSavedBooks(getSavedBooks());
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleRemoveBook(bookKey) {
    const updatedBooks = removeSavedBook(bookKey);
    setSavedBooks(updatedBooks);
  }

  return (
    <section>
      <h1>Saved Books</h1>
      <p>Your saved hobby resources will appear here.</p>

      {savedBooks.length === 0 ? (
        <p>You have not saved any resources yet.</p>
      ) : (
        <div className="book-grid">
          {savedBooks.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onRemove={handleRemoveBook}
              isSavedPage={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedBooks;