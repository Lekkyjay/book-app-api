import express from 'express'
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getByType,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from '../controllers/hotel'
import { verifyAdmin, verifyToken } from '../middlewares/verifyJWT'

const router = express.Router()

//CREATE
router.post('/', verifyToken, verifyAdmin, createHotel)

//UPDATE
router.put('/:id', verifyToken, verifyAdmin, updateHotel)

//DELETE
router.delete('/:id', verifyToken, verifyAdmin, deleteHotel)

//GET
router.get('/find/:id', getHotel)

//GET ALL
router.get('/', getHotels)

router.get('/getByType', getByType)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)

export default router
