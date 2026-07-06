import { getCoverUrl } from "../services/openLibraryApi";

function BookCard({ book, onSave, onRemove, isSavedPage = false }) {
  const coverUrl = getCoverUrl(book.cover_i);

  return (
    <article className="book-card">
      {coverUrl ? (
        <img src={coverUrl} alt={`Cover of ${book.title}`} className="book-cover" />
      ) : (
        <div className="book-cover placeholder-cover">No Cover</div>
      )}

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author_name?.join(", ") || "Unknown author"}</p>
        <p>First published: {book.first_publish_year || "Unknown"}</p>

        {isSavedPage ? (
          <button className="remove-button" onClick={() => onRemove(book.key)}>
            Remove
          </button>
        ) : (
          <button className="save-button" onClick={() => onSave(book)}>
            Save to Stack
          </button>
        )}
      </div>
    </article>
  );
}

export default BookCard;
