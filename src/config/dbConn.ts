import mongoose from 'mongoose'

export const dbConn = async () => {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
  } catch (err) {
    console.log(err)
  }
}
