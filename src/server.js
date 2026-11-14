import "dotenv/config";
import http from "node:http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 3000;

try {
  await connectDB();
  http.createServer(app).listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
} catch (error) {
  console.error("Gagal terhubung ke MongoDB:", error.message);
  process.exit(1);
}