import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../services/openLibraryApi";
import BookCard from "../components/BookCard";
import { saveBook } from "../services/savedBooksStorage";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic")?.trim() || "";

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (topic) {
      setQuery(topic);
      fetchBooks(topic);
    } else {
      setBooks([]);
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

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a hobby or topic to search.");
      return;
    }

    if (trimmedQuery.toLowerCase() === topic.toLowerCase()) {
      fetchBooks(trimmedQuery);
      return;
    }

    setSearchParams({ topic: trimmedQuery });
  }

  function handleSaveBook(book) {
    const { added } = saveBook(book);
    setFeedbackMessage(
      added
        ? "Saved to your book stack."
        : "This resource is already in your saved list."
    );
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

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {feedbackMessage && (
        <p className="status-message" aria-live="polite">
          {feedbackMessage}
        </p>
      )}

      {books.length > 0 && !loading && (
        <p className="results-count">
          Showing {books.length} resources for "{query}"
        </p>
      )}

      {loading && <p>Loading resources...</p>}
      {error && (
        <p className="error-message" aria-live="polite">
          {error}
        </p>
      )}

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