import FakultasModel from '../models/Glosarium.model.js'
import { StoreFakultasSchema } from '../schema/Glosarium.schema.js'
import { apiResponse, apiResponseValidation } from '../utils/response.js'



static async store(req, res) {
  const result = StoreGlosariumSchema.safeParse(req.body) 

  if (!result.success) { 
    return apiResponseValidation({ 
      res, 
      errors: result.error, 
    }) 
  } 

  const { name } = result.data 

  const newGlosarium = await GlosariumModel.create({
    name,
  })

  return apiResponse({
    res,
    status: 201,
    message: 'Glosarium berhasil di buat', 
    data: newGlosarium,
  })
}

