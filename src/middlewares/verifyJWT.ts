import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createCustomError } from '../utils/customError'


interface IVerifiedUser {
  id: string
  isAdmin: boolean
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(createCustomError(401, 'You are not authenticated!'))
  }

  jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
    if (err) return next(createCustomError(403, 'Token is not valid!'))
    req.user = user
    next()
  })
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next()
  } else {
    return next(createCustomError(403, 'You are not authorized!'))
  }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return next(createCustomError(403, 'You are not authorized!'))
  }
}
