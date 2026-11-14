import mongoose from "mongoose";
import glosariumSchema from "./schemas/Glosarium.schema.js";

const Glosarium =
  mongoose.models.Glosarium || mongoose.model("Glosarium", glosariumSchema);

export default Glosarium;