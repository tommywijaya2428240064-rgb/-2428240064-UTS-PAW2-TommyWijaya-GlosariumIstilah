import Glosarium from "../Glosarium.model.js";
import { AppError } from "../errors/app-error.js";
import {
  createGlosariumSchema,
  updateGlosariumSchema,
  idSchema,
} from "../schemas/Glosarium.validation.js";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const SORTABLE_FIELDS = ["term", "category", "createdAt", "updatedAt"];

// CREATE - POST /api/glosarium
export const createGlosarium = async (req, res, next) => {
  try {
    const data = createGlosariumSchema.parse(req.body);
    const glosarium = await Glosarium.create(data);

    res.status(201).json({
      success: true,
      message: "Istilah berhasil ditambahkan",
      data: glosarium,
    });
  } catch (err) {
    next(err);
  }
};

// READ ALL + search + sort - GET /api/glosarium
// Contoh: /api/glosarium?search=api&category=Backend&sortBy=term&order=asc
export const getAllGlosarium = async (req, res, next) => {
  try {
    const { search, term, category, sortBy = "createdAt", order = "desc" } =
      req.query;

    const filter = {};

    if (search) {
      const regex = new RegExp(escapeRegex(String(search)), "i");
      filter.$or = [{ term: regex }, { definition: regex }];
    }
    if (term) {
      filter.term = new RegExp(escapeRegex(String(term)), "i");
    }
    if (category) {
      filter.category = new RegExp(`^${escapeRegex(String(category))}$`, "i");
    }

    if (!SORTABLE_FIELDS.includes(sortBy)) {
      throw new AppError(
        `sortBy tidak valid. Gunakan salah satu: ${SORTABLE_FIELDS.join(", ")}`,
        400
      );
    }
    if (!["asc", "desc"].includes(String(order).toLowerCase())) {
      throw new AppError("order harus 'asc' atau 'desc'", 400);
    }
    const direction = String(order).toLowerCase() === "asc" ? 1 : -1;

    const data = await Glosarium.find(filter).sort({ [sortBy]: direction });

    res.status(200).json({
      success: true,
      message: "Data istilah berhasil diambil",
      count: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// READ DETAIL - GET /api/glosarium/:id
export const getGlosariumById = async (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const glosarium = await Glosarium.findById(id);

    if (!glosarium) throw new AppError("Istilah tidak ditemukan", 404);

    res.status(200).json({
      success: true,
      message: "Detail istilah berhasil diambil",
      data: glosarium,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE - PUT /api/glosarium/:id
export const updateGlosarium = async (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const body = updateGlosariumSchema.parse(req.body);

    const glosarium = await Glosarium.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!glosarium) throw new AppError("Istilah tidak ditemukan", 404);

    res.status(200).json({
      success: true,
      message: "Istilah berhasil diperbarui",
      data: glosarium,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE - DELETE /api/glosarium/:id
export const deleteGlosarium = async (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const glosarium = await Glosarium.findByIdAndDelete(id);

    if (!glosarium) throw new AppError("Istilah tidak ditemukan", 404);

    res.status(200).json({
      success: true,
      message: "Istilah berhasil dihapus",
      data: glosarium,
    });
  } catch (err) {
    next(err);
  }
};

