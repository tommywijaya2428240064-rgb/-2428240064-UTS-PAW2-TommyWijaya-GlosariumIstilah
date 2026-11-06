import mongoose from "mongoose";

const GlosariumSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
},
    {
        timestamps: true,
    },
)

const fakultasModel = mongoose.model('Glosarium',GlosariumSchema)
export default GlosariumModel