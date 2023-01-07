import express from 'express'
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from '../controllers/hotel'
import { verifyAdmin } from '../middlewares/verifyJWT'

const router = express.Router()

//CREATE
// router.post('/', verifyAdmin, createHotel)
router.post('/', createHotel)

//UPDATE
// router.put('/:id', verifyAdmin, updateHotel)
router.put('/:id', updateHotel)

//DELETE
// router.delete('/:id', verifyAdmin, deleteHotel)
router.delete('/:id', deleteHotel)

//GET
router.get('/find/:id', getHotel)

//GET ALL
router.get('/', getHotels)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)

export default router
