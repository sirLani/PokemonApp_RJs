import { rest } from "msw";
import data from "./data";

const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${apiUrl}/pokemon`, async (req, res, ctx) => {
    return res(ctx.json(data));
  }),
];

export { handlers };
