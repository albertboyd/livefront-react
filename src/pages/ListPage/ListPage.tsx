// src/pages/ListPage/ListPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard";
import Loader from "../../components/Loader";
import { searchBooks } from "../../api/openLibrary";
import { BookSearchResult } from "../../types/Book";
import styles from "./ListPage.module.css";
import { FiSearch } from "react-icons/fi";

const ListPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  // Fetch books whenever query changes (after user clicks “Search”)
  const handleSearch = async () => {
    if (!query.trim()) return;
    setTouched(true);
    setLoading(true);
    try {
      const results = await searchBooks(query.trim());
      setBooks(results.docs || []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Book Explorer</h1>
      <p className={styles.instructions}>
        {!touched && (
          <>
            Type a keyword in the search box below and hit “Search” <br />
            to find books from Open Library.
          </>
        )}
        {touched && !loading && books.length === 0 && (
          <>Sorry, no books found. Try another keyword.</>
        )}
      </p>
      <div className={styles.searchBar}>
        <input
          type="text"
          aria-label="Search books"
          className={styles.searchInput}
          placeholder="e.g. Harry Potter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={!query.trim()}
          aria-label="Click to search"
        >
          <FiSearch size={20} />
          <span className={styles.searchButtonText}>Search</span>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onClick={() => navigate(`/book/${book.key.split("/").pop()}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;
