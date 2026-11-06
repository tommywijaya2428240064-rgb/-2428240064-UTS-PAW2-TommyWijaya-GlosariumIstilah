import UserModel from '../models/user.model.js'
import UserView from '../views/user.view.js'
import BaseView from '../views/base.view.js'

class UserController {
  static async getProfile(req, res) {
    try {
      const { id } = req.params

      // 1. Ambil data mentah dari Model
      const user = await UserModel.findById(id)

      if (!user) {
        return res
          .status(404)
          .json(BaseView.renderError('Pengguna tidak ditemukan'))
      }

      // 2. Format data menggunakan View
      const responsePayload = UserView.renderSingle(user)

      // 3. Kembalikan response JSON ke client
      return res.status(200).json(responsePayload)
    } catch (error) {
      return res
        .status(500)
        .json(BaseView.renderError('Terjadi kegagalan server', error.message))
    }
  }

  static async listUsers(req, res) {
    try {
      // 1. Ambil list data dari Model
      const users = await UserModel.findAll()

      // 2. Format data menggunakan View
      const responsePayload = UserView.renderCollection(users, users.length)

      // 3. Kirim response JSON ke client
      return res.status(200).json(responsePayload)
    } catch (error) {
      return res
        .status(500)
        .json(
          BaseView.renderError('Gagal mengambil data pengguna', error.message),

import express from 'express'
import UserController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/users', UserController.listUsers)
router.get('/users/:id', UserController.getProfile)

export default router
        )
    }
  }
}

export default UserController