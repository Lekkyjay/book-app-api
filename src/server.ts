require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { dbConn } from './config/dbConn'
import { corsOptions } from './config/corsOptions'
import authRoutes from './routes/auth'

const app = express()
dbConn()

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
})
