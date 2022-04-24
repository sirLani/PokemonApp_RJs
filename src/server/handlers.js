const { rest } = require("msw");
const { data } = require("./data");

const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${apiUrl}/pokemons`, async (req, res, ctx) => {
    return res(ctx.json(data));
  }),
];

export { handlers };
