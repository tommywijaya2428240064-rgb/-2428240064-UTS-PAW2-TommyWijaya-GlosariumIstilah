import mongoose from "mongoose";

export const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Jaringan",
  "Keamanan",
  "Umum",
];

const glosariumSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: [true, "term wajib diisi"],
      trim: true,
      unique: true,
      minlength: [2, "term minimal 2 karakter"],
      maxlength: [100, "term maksimal 100 karakter"],
    },
    definition: {
      type: String,
      required: [true, "definition wajib diisi"],
      trim: true,
      minlength: [5, "definition minimal 5 karakter"],
      maxlength: [1000, "definition maksimal 1000 karakter"],
    },
    category: {
      type: String,
      required: [true, "category wajib diisi"],
      trim: true,
      enum: {
        values: CATEGORIES,
        message: `category harus salah satu dari: ${CATEGORIES.join(", ")}`,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export default glosariumSchema;