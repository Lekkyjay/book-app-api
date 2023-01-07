import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { createCustomError } from '../utils/customError'

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      ...req.body,
      password: hash,
    })

    await newUser.save()
    res.status(200).send("User has been created.")
  } catch (err) {
    next(err)
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createCustomError(404, "User not found!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createCustomError(400, "Wrong password or username!"))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT as string
    )

    const { password, isAdmin, ...otherDetails } = user
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (err) {
    next(err)
  }
}

export { loginUser, registerUser }