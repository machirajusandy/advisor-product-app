import "dotenv/config";
import "@/db/mongoose";
import server from "./app";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
