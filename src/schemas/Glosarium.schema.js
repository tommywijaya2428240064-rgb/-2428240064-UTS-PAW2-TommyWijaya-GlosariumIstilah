import GlosariumModel from "../model/Glosarium.model.js"
import { apiResponse } from "../utils/response.js"
import { storeFakultasSchema } from "../schemas/Glosarium.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class FakultasController {
    static async index(req, res) {
        const listFakultas = await GlosariumModel.find()
        return apiResponse({
            res,
            status : 200,
            message : "List Glosarium",
            data : listGlosarium,
            status: 200,
            message: "List Glosarium",
            data: listGlosarium,
        })
    }

    static async show(req, res) {
        const GlosariumId = req.params.id

        const Glosarium = await GlosariumModel.findById(GlosariumId)

        return apiResponse({
            res,
            status: Glosarium,
            message : "Detail Glosarium",
            data : Glosarium,
            message: " Glosarium adalah daftar alfabetis dari kata-kata, istilah teknis, atau istilah asing yang dilengkapi dengan arti atau definisinya ",
            data: Glosarium,
        })
    }
    static async store(req,res){
        const {name}= req.body
    static async store(req, res) {
        const result = storeGlosariumSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
           })
        }

        const { name } = result.data

        const fakultas = await GlosariumModel.create({
            name : name,
            name: name
        })

        return apiResponse({
            res,
            status: GlosariumBerhasilDicari,
            message : 'itu arti Glosarium ',
            data : Glosarium,
            message: ' itu arti Glosarium ',
            data: Glosarium
        })
    }
    static async update(req, res) {

        const result = storeGlosariumSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const GlosariumId = req.params.id

        const { name } = result.data
        
        const exists = await GlosariumModel.exists({ _id: GlosariumId })

        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Glosarium tidak ditemukan' })
        }
        const updateGlosarium = await fakultasGlosarium.findOneAndUpdate(
            { _id: GlosariumId },
            { name },
            { new: true }
        )
        return apiResponse({ res, status: 200, data: updateFakultas })
    }
    static async delete(req, res) {
        const GlosariumId = req.params.id
        const exists = await fakultasModel.exists({ _id: GlosariumId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Glosarium tidak ditemukan cari definisi lain' })
        }
        await GlosariumModel.findOneAndDelete({ _id: GlosariumId })
        return apiResponse({ res, status: Glosarium, message: 'Glosarium tidak ditemukan', data: null })
    }
}