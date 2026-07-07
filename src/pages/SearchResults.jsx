import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../services/openLibraryApi";
import BookCard from "../components/BookCard";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (topic) {
      setQuery(topic);
      fetchBooks(topic);
    }
  }, [topic]);

  async function fetchBooks(searchTerm) {
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const results = await searchBooks(searchTerm);
      setBooks(results);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a hobby or topic to search.");
      return;
    }

    fetchBooks(query);
  }

  function handleSaveBook(book) {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

    const alreadySaved = savedBooks.some(
      (savedBook) => savedBook.key === book.key
    );

    if (!alreadySaved) {
      const updatedBooks = [...savedBooks, book];
      localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
      alert("Saved to your book stack!");
    } else {
      alert("This resource is already saved.");
    }
  }

  return (
    <section>
      <h1>Search Hobby Resources</h1>
      <p>Search for books and learning resources by hobby or topic.</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Try woodworking, crochet, cars..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>
       {books.length > 0 && !loading && (
  <p className="results-count">
    Showing {books.length} resources for "{query}"
  </p>
)}
 
      {loading && <p>Loading resources...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p>No resources yet. Try searching for a hobby.</p>
      )}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.key} book={book} onSave={handleSaveBook} />
        ))}
      </div>
    </section>
  );
}

export default SearchResults;