// src/components/BookCard/BookCard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookCard from "./BookCard";
import { BookSearchResult } from "../../types/Book";

describe("BookCard component", () => {
  const book: BookSearchResult = {
    key: "/works/OL123W",
    title: "Test Book",
    author_name: ["Author One", "Author Two"],
    cover_i: 123456,
  };

  test("renders book title and first author", () => {
    render(
      <BrowserRouter>
        <BookCard book={book} onClick={() => {}} />
      </BrowserRouter>
    );

    // Title should render
    expect(screen.getByText("Test Book")).toBeInTheDocument();

    // Only the first author should render
    expect(screen.getByText("Author One")).toBeInTheDocument();
    expect(screen.queryByText("Author One, Author Two")).toBeNull();
  });

  test("calls onClick when card is clicked", () => {
    const handleClick = jest.fn();
    render(
      <BrowserRouter>
        <BookCard book={book} onClick={handleClick} />
      </BrowserRouter>
    );

    // Find the <img> by alt text, then grab its parent <div> wrapper
    const img = screen.getByRole("img", { name: /Test Book/i });
    const cardWrapper = img.closest("div");
    if (!cardWrapper) {
      throw new Error("Card wrapper not found");
    }

    fireEvent.click(cardWrapper);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
