// src/App.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Book Explorer heading", () => {
  // App already wraps its routing internally, so we don’t wrap in BrowserRouter here.
  render(<App />);
  const heading = screen.getByText(/Book Explorer/i);
  expect(heading).toBeInTheDocument();
});
