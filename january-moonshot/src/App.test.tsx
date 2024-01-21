import { render, screen } from "@testing-library/react";
import App from "./App";

it("should have Stock Images", () => {
  render(<App />);
  const message = screen.queryByText(/Stock Images/i);
  expect(message).toBeVisible();
});
