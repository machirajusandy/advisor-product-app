import { connect, connection } from "mongoose";

const dbUri = process.env.MONGODB_URI as string;

if (!dbUri) {
  throw new Error("MONGODB_URI is not defined");
}

connection.on("connected", () => {
  console.info("Mongoose is connected to " + dbUri);
});

connection.on("error", (err) => {
  console.error(err);
});

connection.on("disconnected", () => {
  console.info("Mongoose is disconnected");
});

process.on("SIGINT", () => {
  console.info("Mongoose disconnected on exit process");
  process.exit(0);
});

export default connect(dbUri);
