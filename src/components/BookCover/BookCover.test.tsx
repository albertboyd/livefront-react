import { render } from "@testing-library/react";
import BookCover from "../BookCover";

test("renders fallback image when no coverId", () => {
  const { getByAltText } = render(<BookCover alt="Fallback Cover" />);
  const img = getByAltText("Fallback Cover") as HTMLImageElement;
  expect(img.src).toMatch(/placeholder/);
});
