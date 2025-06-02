// src/pages/ListPage/ListPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListPage from "./ListPage";

describe("ListPage component", () => {
  test("shows instructions before search", () => {
    render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Type a keyword in the search box below/i)
    ).toBeInTheDocument();
  });

  test("search button enables when typing", () => {
    render(
      <BrowserRouter>
        <ListPage />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("e.g. Harry Potter");
    const button = screen.getByRole("button", { name: /click to search/i });

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "tolkien" } });
    expect(button).toBeEnabled();
  });
});
