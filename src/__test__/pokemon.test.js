import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import data from "../server/data";
import App from "App";

test("renders all the pokemon information", async () => {
  const originalFetch = window.fetch;

  window.fetch = async (url, config) => {
    if (url.endsWith("/pokemon/ditto")) {
      return {
        ok: true,
        json: async () => ({
          listItems: data,
        }),
      };
    }

    return originalFetch(url, config);
  };

  render(<App />, { wrapper: Router });
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));
});
