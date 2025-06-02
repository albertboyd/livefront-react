// src/pages/DetailPage/DetailPage.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetailPage from "./DetailPage";
import * as api from "../../api/openLibrary";

// Make getBookDetails always reject so the fallback path is hit immediately.
jest.spyOn(api, "getBookDetails").mockImplementation(() => {
  return Promise.reject(new Error("not found"));
});

describe("DetailPage component (fallback state)", () => {
  test("renders fallback message when getBookDetails rejects", async () => {
    // Render the DetailPage at the path "/book/INVALID_ID":
    render(
      <MemoryRouter initialEntries={["/book/INVALID_ID"]}>
        <Routes>
          <Route path="/book/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Since getBookDetails is mocked to reject, DetailPage will:
    //   1) Start loading → show <Loader />
    //   2) Then catch in useEffect → setBook(null) → show the fallback UI

    // Wait for the fallback text to appear in the DOM:
    await waitFor(() => {
      expect(
        screen.getByText(/Oops, could not load book details\./i)
      ).toBeInTheDocument();
    });

    // And verify the Back link is present:
    expect(
      screen.getByRole("link", { name: /← Back to results/i })
    ).toBeInTheDocument();
  });
});
