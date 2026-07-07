import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function SavedStack() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setSavedBooks(storedBooks);
  }, []);

  function handleRemoveBook(bookKey) {
    const updatedBooks = savedBooks.filter((book) => book.key !== bookKey);
    setSavedBooks(updatedBooks);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
  }

  return (
    <section>
      <h1>Saved BookStack</h1>
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

export default SavedStack;