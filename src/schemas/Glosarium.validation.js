import { z } from "zod";
import { CATEGORIES } from "./Glosarium.schema.js";

export const createGlosariumSchema = z.object({
  term: z
    .string({ required_error: "term wajib diisi" })
    .trim()
    .min(2, "term minimal 2 karakter")
    .max(100, "term maksimal 100 karakter"),
  definition: z
    .string({ required_error: "definition wajib diisi" })
    .trim()
    .min(5, "definition minimal 5 karakter")
    .max(1000, "definition maksimal 1000 karakter"),
  category: z.enum(CATEGORIES, {
    required_error: "category wajib diisi",
    errorMap: (issue, ctx) =>
      issue.code === "invalid_enum_value"
        ? { message: `category harus salah satu dari: ${CATEGORIES.join(", ")}` }
        : { message: ctx.defaultError },
  }),
});

export const updateGlosariumSchema = createGlosariumSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk memperbarui data",
  });

export const idSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "ID tidak valid");