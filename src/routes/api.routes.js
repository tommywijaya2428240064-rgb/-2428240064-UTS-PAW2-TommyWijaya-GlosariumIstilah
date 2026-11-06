import express from 'express'
import FakultasController from '../controllers/fakultas.controller.js'
import { logMiddleware } from '../middleware/log.middleware.js'

const router = express.Router()

router.use(logMiddleware) 

router.get('/Glosarium', GlosariumController.index)
router.get('/Glosarium/:id', GlosariumController.show)
router.post('/Glosarium', GlosariumController.store)
router.put('/Glosarium/:id', GlosariumController.update)
router.patch('/Glosarium/:id', GlosariumController.update)
router.delete('/Glosarium/:id', GlosariumController.delete)

export default router
