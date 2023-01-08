import { NextFunction, Request, Response } from 'express'
import Hotel from '../models/Hotel'
import Room from '../models/Room'
import { createCustomError } from '../utils/customError'

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  const newHotel = new Hotel(req.body)

  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedHotel)
  } catch (err) {
    next(err)
  }
}

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json('Hotel has been deleted.')
  } catch (err) {
    next(err)
  }
}

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
}

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  const { min, max, limit, ...others } = req.query
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: Number(min) | 1, $lt: max || 999 },
    }).limit(Number(limit))
    res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
  const cities = (req.query.cities as string).split(',')
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const resortCount = await Hotel.countDocuments({ type: 'resort' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' })

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ])
  } catch (err) {
    next(err)
  }
}

export const getHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel) return next(createCustomError(404, 'Hotel not found!'))

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}
