import express from "express";

import apiRoutes from "./routes/api.routes.js";
import requestLogger from "./middleware/requestLogger.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API Glosarium Istilah berjalan" });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;