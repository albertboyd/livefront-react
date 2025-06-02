import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import BookCover from "../../components/BookCover";
import Loader from "../../components/Loader";
import { getBookDetails } from "../../api/openLibrary";
import { BookDetails } from "../../types/Book";

import styles from "./DetailPage.module.css";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [authorNames, setAuthorNames] = useState<string[]>([]);
  const [subjectsExpanded, setSubjectsExpanded] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data: BookDetails = await getBookDetails(id);
        setBook(data);

        if (data.authors && data.authors.length) {
          const names = await Promise.all(
            data.authors.map(async (entry) => {
              const rawKey = entry.author.key; // "/authors/OL23919A"
              const authorUrl = `https://openlibrary.org${rawKey}.json`;
              try {
                const resp = await axios.get<{ name: string }>(authorUrl);
                return resp.data.name;
              } catch {
                return "Unknown Author";
              }
            })
          );
          setAuthorNames(names);
        } else {
          setAuthorNames([]);
        }
      } catch (err) {
        console.error(err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const renderFirstPublished = () => {
    if (!book) return "—";
    if (book.first_publish_date) return book.first_publish_date;
    if (book.first_publish_year) return book.first_publish_year.toString();
    return "—";
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (!loading && !book) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMsg}>Oops, could not load book details.</p>
        <Link to="/" className={styles.backLink}>
          ← Back to results
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Back to results
      </Link>

      <div className={styles.detailCard}>
        <h2 className={styles.title}>{book!.title}</h2>
        <p className={styles.tip}>Scroll down for more info.</p>

        <div className={styles.mainContent}>
          <div className={styles.coverWrapper}>
            <BookCover
              coverId={book!.covers?.[0]}
              alt={book!.title}
            />
          </div>

          <div className={styles.infoSection}>
            <p>
              <strong>Author:</strong>{" "}
              {authorNames.length ? authorNames.join(", ") : "—"}
            </p>
            <p>
              <strong>First Published:</strong> {renderFirstPublished()}
            </p>

            {book!.description && (
              <p className={styles.description}>
                <strong>Description:</strong>{" "}
                {typeof book!.description === "string"
                  ? book!.description
                  : book!.description.value}
              </p>
            )}

            {book!.subjects && book!.subjects.length > 0 && (
              <div className={styles.subjectSection}>
                <h3>Subjects</h3>

                <div className={styles.subjectList}>
                  {(subjectsExpanded
                    ? book!.subjects
                    : book!.subjects.slice(0, 10)
                  ).map((subject, idx) => (
                    <span key={idx} className={styles.subjectTag}>
                      {subject}
                    </span>
                  ))}
                </div>

                {!subjectsExpanded && book!.subjects.length > 10 && (
                  <button
                    className={styles.expandButton}
                    onClick={() => setSubjectsExpanded(true)}
                  >
                    …and {book!.subjects.length - 10} more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
