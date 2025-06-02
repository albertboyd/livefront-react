import styles from "./BookCover.module.css";

interface Props {
  coverId?: number;
  alt: string;
  size?: "S" | "M" | "L";
  height?: number;
}

const BookCover = ({ coverId, alt, size = "M", height }: Props) => {
  const url = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <img
      src={url}
      alt={alt}
      className={styles.image}
      style={{ height: height ?? "auto" }}
    />
  );
};

export default BookCover;
