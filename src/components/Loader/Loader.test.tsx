import { render } from "@testing-library/react";
import Loader from "../Loader";

test("renders loading spinner", () => {
  const { container } = render(<Loader />);
  const spinner = container.querySelector(".spinner");
  expect(spinner).toBeInTheDocument();
});
