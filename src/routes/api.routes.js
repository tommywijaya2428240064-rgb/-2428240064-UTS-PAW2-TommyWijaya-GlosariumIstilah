import { Router } from "express";
import {
  createGlosarium,
  getAllGlosarium,
  getGlosariumById,
  updateGlosarium,
  deleteGlosarium,
} from "../controllers/Glosarium.controller.js";

const router = Router();

router.route("/glosarium").post(createGlosarium).get(getAllGlosarium);

router
  .route("/glosarium/:id")
  .get(getGlosariumById)
  .put(updateGlosarium)
  .delete(deleteGlosarium);

export default router;