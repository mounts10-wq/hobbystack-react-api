import { getCoverUrl } from "../services/openLibraryApi";

function BookCard({ book, onSave, onRemove, isSavedPage = false }) {
  const coverUrl = getCoverUrl(book.cover_i);

  return (
    <article className="book-card">
      <div className="book-cover-wrapper">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="book-cover"
          />
        ) : (
          <div className="book-cover placeholder-cover">No Cover</div>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>

        <p className="book-author">
          {book.author_name?.join(", ") || "Unknown author"}
        </p>

        <p className="book-meta">
          First published: {book.first_publish_year || "Unknown"}
        </p>

        {book.subject?.length > 0 && (
          <p className="book-subject">
            Topic: {book.subject[0]}
          </p>
        )}

        {isSavedPage ? (
          <button className="remove-button" onClick={() => onRemove(book.key)}>
            Remove
          </button>
        ) : (
          <button className="save-button" onClick={() => onSave(book)}>
            Save to HobbyBook
          </button>
        )}
      </div>
    </article>
  );
}

export default BookCard;