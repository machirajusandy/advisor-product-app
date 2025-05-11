/* eslint-disable @typescript-eslint/no-require-imports */
const { connect, connection } = require("mongoose");

beforeAll(async () => {
  await connect(globalThis.__MONGO_URI__);
});

afterAll(async () => {
  await connection.close();
});
