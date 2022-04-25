import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "App";

test("renders all the pokemon information", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));
});
