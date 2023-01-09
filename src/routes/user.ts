import express from 'express'
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verifyJWT'

const router = express.Router()

//UPDATE
router.put('/:id', verifyToken, verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyToken, verifyUser, deleteUser)

//GET
router.get('/:id', verifyToken, verifyUser, getUser)

//GET ALL
// router.get('/', verifyToken, verifyAdmin, getUsers)
router.get('/', getUsers)

export default router
