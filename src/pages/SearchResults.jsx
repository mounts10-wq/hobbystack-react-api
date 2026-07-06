import { useState } from "react";
import { searchBooks } from "../services/openLibraryApi";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a hobby or topic to search.");
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

      {loading && <p>Loading resources...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p>No resources yet. Try searching for a hobby.</p>
      )}

      <div className="book-grid">
        {books.map((book) => (
          <article key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(", ") || "Unknown author"}</p>
            <p>
              First published: {book.first_publish_year || "Unknown"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SearchResults;