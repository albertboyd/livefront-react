// src/components/BookCard/BookCard.tsx

import React from "react";
import { BookSearchResult } from "../../types/Book";
import styles from "./BookCard.module.css";

interface Props {
  book: BookSearchResult;
  onClick: () => void;
}

const BookCard: React.FC<Props> = ({ book, onClick }) => {
  // If there's a cover_i, build the Open Library URL; else, show a blank placeholder
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className={styles.card} onClick={onClick}>
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title}
          className={styles.coverImage}
        />
      ) : (
        <div className={styles.coverImage} />
      )}

      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        {/* If you pulled author_name from the search result, show it */}
        {book.author_name?.length ? (
          <p className={styles.author}>{book.author_name[0]}</p>
        ) : (
          <p className={styles.author}>Unknown Author</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
