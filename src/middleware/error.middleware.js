import { ZodError } from "zod";
import mongoose from "mongoose";
import { AppError } from "../errors/app-error.js";

// 404 untuk route yang tidak ditemukan
export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} tidak ditemukan`, 404));
};

// Error handler terpusat, respons selalu JSON
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Terjadi kesalahan pada server";
  let errors;

  // 1. Validasi zod -> 400
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validasi data gagal";
    errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  // Validasi Mongoose -> 400
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validasi data gagal";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // ID tidak valid -> 400
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Nilai '${err.value}' tidak valid untuk field '${err.path}'`;
  }
  // Data duplikat -> 409
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Data dengan ${field} '${err.keyValue?.[field]}' sudah ada`;
  }
  // 2. Tidak ditemukan (404) dan error manual lain
  else if (err instanceof AppError) {
    errors = err.errors;
  }
  // 3. Kesalahan server -> 500
  else {
    statusCode = 500;
    message = "Terjadi kesalahan pada server";
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(errors && { errors }),
  });
};

export default errorHandler;